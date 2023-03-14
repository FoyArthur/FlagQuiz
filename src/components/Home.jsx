import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Context from '../Context';
function Home (props) {
  const navigate = useNavigate();
  const [input, setInput] = React.useState('');

  function createRoom (e) {
    e.preventDefault();
    props.createRoom();
  }

  function inputChange(e) {
    e.preventDefault();
    setInput(e.target.value);
    console.log(input);
  }

  function joinRoom (e) {
    e.preventDefault();
    props.joinRoom(input);
    setInput('');
  }

  useEffect(() => {
    if(props.room !== 0) {
      navigate(`/${props.room}`);
    }
  }, [props.room]);

  return (
    <div>
      <button onClick= {createRoom}>Create Room</button>
      <br/><br/><br/><br/>
      <div>Join Room</div>
      <Context.Consumer>
        {({room}) => (
          <div>
          <form onSubmit={joinRoom}>
            <input type='text' name='input' value={input} onChange={inputChange}/>
            <input type='submit' value='Join Room'/>
          </form>
          <div>
            Room: {room}
          </div>
          </div>
        )}
      </Context.Consumer>
    </div>
  );
  
}

export default Home;