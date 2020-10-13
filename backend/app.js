const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const http = require('http');
const io = require('socket.io');

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();
const server = http.createServer(app);
const socketIO = io(server);


//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
// mongoose.connect('mongodb://TapeGhad:1985Chess1985@chess-shard-00-00.mc0lt.mongodb.net:27017,chess-shard-00-01.mc0lt.mongodb.net:27017,chess-shard-00-02.mc0lt.mongodb.net:27017/Chess?ssl=true&replicaSet=atlas-i2izt9-shard-0&authSource=admin&retryWrites=true&w=majority');
// mongoose.set('debug', true);

mongoose.Promise = global.Promise
mongoose.set('debug', true)
mongoose.connection
    .on(`error`,error => console.log(error))
    .on(`close`, ()=>console.log('DB connection closed.'))
    .once(`open`, () => {
        const info = mongoose.connections[0]
        console.log(`Connection to ${info.host}:${info.port}/${info.name}`)
    })
mongoose.connect('mongodb://ChessUser:1905Chess@chess-shard-00-00.c41mp.mongodb.net:27017,chess-shard-00-01.c41mp.mongodb.net:27017,chess-shard-00-02.c41mp.mongodb.net:27017/Chess?ssl=true&replicaSet=atlas-xlzo6d-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

//Models & routes
require('./models/Users');
require('./models/GlobalChat');
require('./models/FinishedGames');
require('./models/OpenGames');
require('./config/passport');
app.use(require('./routes'));

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.json({
      success: false,
      message: 'No token provided.'
    });
  }
});

const GlobalChat = mongoose.model('GlobalChat');
const OpenGame = mongoose.model('OpenGame');

socketIO.on('connection', (socket) => {
  socket.on('disconnect', () => {
  })

  socket.on('send', (msg) => {
    let Message = new GlobalChat();
    Message.userName = msg.userName;
    Message.user = msg.id;
    Message.message = msg.message;
    Message.time = msg.time;
    Message.save().then(() => {socketIO.sockets.emit('add', msg);})
      .catch(err => console.log(err));
      
  });

  socket.on('move', (data) => {
    OpenGame.findOneAndUpdate({_id: data.game}, {"$push": { "moves": data.move }}, (err, game) => {
      if (err) {
        console.log(err)
      } else {
        socketIO.to(data.game).emit('newMove', data.move);
      }
    })
  })

  socket.on('getGlobalChatMessages', () => {
    GlobalChat.find({}, (err, messages) => {
      socketIO.sockets.emit('allMessages', messages);
    });
  });

  socket.on('playerMessage', (data) => {
    OpenGame.findOneAndUpdate({_id: data.id}, {"$push": { "chat": data.message }}, (err, value) => {
      if (err) {
        console.log(err)
      } else {
        socketIO.to(data.id).emit('newMessage', data.message);
      }
    })
  })

  socket.on('loadGames', () => {
    OpenGame.find({ isOpen: true }, (err, allOpenGames) => {
      socket.emit('newGameInfo', allOpenGames);
    });
  })

  socket.on('newGame', (info) => {
    let Game = new OpenGame();
    Game.players.player1ID = info.playerID;
    Game.players.player1Name = info.playerName;
    Game.players.player1Color = info.color;
    Game.timeToGo = info.time;
    Game.isOpen = true;
    socket.join(Game._id);

    OpenGame.deleteMany({"players.player1ID": info.playerID}).then(() => {
      Game.save().then(() => {
        OpenGame.find({ isOpen: true }, (err, allOpenGames) => {
          socketIO.sockets.emit('newGameInfo', allOpenGames);
        })
        .catch(err => console.log(err));
      })
    })
    .catch(err => console.log(err));
  })

  socket.on('connectToGame', player2info => {
    OpenGame.findOneAndUpdate({_id: player2info.gameId}, { $set: {isOpen: false, "players.player2ID":  player2info.player2ID, "players.player2Name": player2info.player2Name}}, (err, gameFound) => {
        if (err) {
          console.log(err)
        } else {
          OpenGame.find({ isOpen: true }, (err, allOpenGames) => {
            socketIO.sockets.emit('newGameInfo', allOpenGames);
          });
        }
    });
    OpenGame.find({_id: player2info.gameId}, (err, game) => {
      socket.join(player2info.gameId);
      socketIO.to(player2info.gameId).emit('startGame', { ...game[0]._doc, ...player2info });
    });
  })

  socket.on('joinRoom', id => {
    socket.join(id);
    OpenGame.find({_id: id}, (err, game) => {
      if (err) {
        console.log(err)
      } else if (id && game[0]) {
        console.log('load');
        socketIO.to(id).emit('allMoves', game[0].moves);
        socketIO.to(id).emit('playersChat', game[0].chat);
      }
    })

  })
})

server.listen(8000, () => console.log('Server running on http://localhost:8000/'));