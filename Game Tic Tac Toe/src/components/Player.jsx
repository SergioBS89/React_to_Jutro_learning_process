import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {

  const [isEdited, setIsEdited] = useState(false);
  const [customName, setCustomName] = useState(initialName);

  function handleEditPlayerName() {
    // Best practices to change the State (true - false) in isEdited value
    setIsEdited((editing)=> !editing);
  }

  /**
   * @param {Way to access to the value from an input text} event 
   */
  function handleChange(event) {
    let name = event.target.value
    setCustomName(name);
    if(isEdited){
      onChangeName(symbol, name)
    }
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {!isEdited ? (
          <span className="player-name">{customName}</span>
        ) : (
          <input type="text" required defaultValue={initialName} onChange={handleChange}/>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditPlayerName}>{isEdited ? "Save" : "Edit"}</button>
    </li>
  );
}