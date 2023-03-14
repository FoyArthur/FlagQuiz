const http = require('http');
const server = require('socket.io');
const {v4: uuidv4} = require('uuid');

const httpServer = http.createServer();
const io = new server.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET"]
  }
});

const rooms = io.of("/").adapter.rooms;
const sids = io.of("/").adapter.sids;
const names = new Map();
const games = new Map();
io.on('connection', (socket) => {
  console.log('user connected');
  console.log(typeof rooms);
  socket.on('disconnect', () => {
    
  });
  socket.on('create room', () => {
    console.log('room created');
    const room = uuidv4();
    socket.join(room);
    io.to(socket.id).emit('room joined', room);
    const arr = (Array.from(socket.rooms));
    for(let i of arr) {
      console.log(i);
    }
  });
  socket.on('join room', (room) => {
    if(rooms.get(room)) {
      socket.join(room);
      console.log('joined');
      io.to(socket.id).emit('room joined', room);
    } else {
      io.to(socket.id).emit('invalid room');
    }
  });

  socket.on('ready', (name) => {
    console.log('ready');
    names.set(socket.id, name);
    console.log(Array.from(sids.get(socket.id)));
    const roomId = Array.from(sids.get(socket.id))[1];
    const room = rooms.get(roomId);
    console.log(room);
    const players = [];
    if(room) {
      for(const i of room) {
        const name = names.get(i);
        if(name) {
          players.push(name);
        }
      }
      for(let i of players) {
        console.log(i);
      }
      io.to(roomId).emit('players', players);
    }
  });

  socket.on('start game', () => {
    const rounds = 6;
    const roomId = Array.from(sids.get(socket.id))[1];
    games.set(roomId, []);
    io.to(roomId).emit('game starting');
    let Nums = generateFlags(rounds); 
    for (let i = 1; i < rounds+1; i++) {
        setTimeout(function() {
          io.to(roomId).emit("game move",  flags[arr[Nums[i-1]]]);
        }, 6000*i);
        if (i == rounds) {
            setTimeout(() => {
                io.to(roomId).emit("game over");
            }, 6000 * (i+1));
        }
    }
  });

  socket.on('')

});

httpServer.listen(8000, () => {
  console.log('listening');
});
