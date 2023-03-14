import Home from './components/Home';
import Loading from './components/Loading'
import {Routes, Route, redirect, BrowserRouter} from "react-router-dom";
import React, {useEffect} from 'react';
import io from 'socket.io-client';
import Context from './Context';

const socket = io.connect('http://localhost:8000');

function App() {
  const [room, setRoom] = React.useState(0);
  const [players, setPlayers] = React.useState([]);
  const [game, setGame] = React.useState(false);

  useEffect(() => {
    socket.on('room joined', (room) => {
      setRoom(room);
    });

    socket.on('players', (players) => {
      setPlayers(players);
      console.log(players);
    });

    socket.on('game starting', () => {
      setGame(true);
    });

    // socket.on('error joining')
    return () => {
      socket.off('room joined');
      socket.off('players');
    }
  }, []);

  function joinRoom(room) {
    socket.emit('join room', room);
  }

  function createRoom() {
    socket.emit('create room');
  }

  function readyUp(name) {
    socket.emit('ready', name);
  }

  function startGame() {
    socket.emit('start game');
  }

  return (
    <Context.Provider value={{room, joinRoom, players, game}}>
      <BrowserRouter>
        <Routes>
            <Route path='/'
              element={<Home joinRoom={joinRoom} createRoom={createRoom} room={room}/>}/>
            <Route path=':gameId' element={<Loading readyUp={readyUp} startGame={startGame}/>}/>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
