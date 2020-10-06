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

let games = [];


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
mongoose.connect('mongodb://TapeGhad:1985Chess1985@chess-shard-00-00.mc0lt.mongodb.net:27017,chess-shard-00-01.mc0lt.mongodb.net:27017,chess-shard-00-02.mc0lt.mongodb.net:27017/Chess?ssl=true&replicaSet=atlas-i2izt9-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

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
    Message.user = msg.id;
    Message.message = msg.text;
    Message.save().then(() => {socketIO.sockets.emit('add', msg);})
      .catch(err => console.log(err));
      
  });

  socket.on('loadGames', () => {
    socket.emit('newGameInfo', games)
  })

  socket.on('newGame', (info) => {
    info.id = games.length + 100000
    let Game = new OpenGame();
    Game.players.player1 = info.player;
    Game.players.player1Color = info.color;
    Game.timeToGo = info.time;

    games.push(info);
    console.log(games);
    
    Game.save().then(() => {socket.emit('newGameInfo', games)})
    .catch(err => console.log(err));
    
  })
})

server.listen(8000, () => console.log('Server running on http://localhost:8000/'));