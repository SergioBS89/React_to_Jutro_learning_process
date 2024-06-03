import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handlerClick() {
    console.log(playerName);
    setEnteredPlayerName(playerName.current.value);
  }
  return (
    <section id="player">
      {/* This ?? means a shortcode which represents a ternary statement */}
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input
          //With ref we are getting the whole object from input and it's stored in playerName
          ref={playerName}
          type="text"
        />
        <button onClick={handlerClick}>Set Name</button>
      </p>
    </section>
  );
}
