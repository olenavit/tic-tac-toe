import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import {PLAYERS} from './constants.js';
import {deriveActivePlayer, deriveGameBoard, deriveWinner} from "./functions.js";
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectPlayer(rowIndex, colIndex) {
    setGameTurns((prevGameTurn) => {
      const currentPlayer = deriveActivePlayer(prevGameTurn);

      const updatedGameTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevGameTurn,
      ];

      return updatedGameTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayersNames) => ({
      ...prevPlayersNames,
      [symbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="player1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangePlayerName={handlePlayerNameChange}
          />
          <Player
            name="player2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangePlayerName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectPlayer={handleSelectPlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
