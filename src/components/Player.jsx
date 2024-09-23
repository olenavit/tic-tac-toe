import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangePlayerName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function savePlayerName() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangePlayerName(symbol, playerName);
    }
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handlePlayerNameChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={savePlayerName}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
