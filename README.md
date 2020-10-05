# Chess portal
## Description
Chess portal is a place where people meet to play chess, communicate about chess and get information about chess. 
In the ideal case we must create a site like chess.com or lichess.org.
## Bare-bones agenda
### The site must include at least:

- **Homepage** with some information about the game itself, tutorials, news, blogs and two big buttons “Play against a human” and play “Play against the computer”.
- **“Play against the computer”** page essentially contains two elements - the game board and the game history. This page doesn’t need any authentication - everyone can play.
The used chess engine is [Stockfish](https://stockfishchess.org/).
- **“Play against a human”** has additionally a chat, where players can communicate to each other. The players must be logged in to play.
- **Game lobby** - a virtual waiting area, where players can choose the opponent or create their own call.
- **Personal** area with personal information and statistics.

Depending on our group size, our abilities, collaboration and our mentor demands here can be added different components: blog, forum, tournaments, puzzles, game analysis, openings explorer and whatever you want.

## Technology stack proposal
### Frontend:
- Vue.js
- vuetify (Vue Material Design Component Framework)
- axios (Ajax library)
- vuex
- socket.io 
### Backend
- Node.js 
- MongoDB (please read about the Portable [Game Notation-format](https://en.wikipedia.org/wiki/Portable_Game_Notation) and you will see, how convenient it is to store such data in MongoDB-documents)
- Passport.js
- Express.js
- socket.io


## Workflow

At the first stage we can split our efforts into three threads:

- Game mechanics and logic
- Authorization and authentication
- Chat. The chat will have two types of messages: text messages and chess moves.

Then during the process we can rearrange our efforts, depending on ongoing severities and conditions.

Please share your ideas and remarks.
