import { useParams } from "react-router-dom";
import React from 'react';
import Flag from './Flag';
import Context from "../Context";

function Loading (props) {
  let {gameId} = useParams();
  let [ready, setReady] = React.useState(false);
  let [input, setInput] = React.useState('');
  const [leader, setLeader] = React.useState(false);

  function inputChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function readyUp(e) {
    e.preventDefault();
    if(input !== '') {
      setReady(true);
      props.readyUp(input);
    }
    setInput('');
  }

  function startMatch(e) {
    e.preventDefault();
    props.startGame();
  }
  
  if(ready) {
    return (
      <div>
      <Context.Consumer>
        {({players}) => (
          <ul>
            {players.map((player, i) => 
              <li key={i}>{player}</li>
            )}
          </ul>
        )}
      </Context.Consumer>
      {leader &&
         <button type='button' onClick={startMatch}>Start</button>   
      }
      </div>
    );
  } else {
    return (
      <div>
      Lobby: {gameId}
      <form onSubmit={readyUp}>
        <input type='text' value ={input} onChange={inputChange}/>
        <input type='submit' value='Ready'/>
      </form>
      </div>
    );
  }
}

export default Loading;