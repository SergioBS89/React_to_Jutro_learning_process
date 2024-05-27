import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

let playerOne = 'X'
let playerTwo = 'O'
let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function helperActivePlayer(historic) {
  let currentPlayer = playerOne
  if (historic.length > 0 && historic[0].player === playerOne) {
    currentPlayer = playerTwo
  }
  return currentPlayer;
}

function App() {
  /**
  * States
  */
 const [players, setPlayers]= useState({
  X: 'Player 1',
  O: 'Player 2'
 })
  const [historic, setHistoric] = useState([])

  const activePlayer = helperActivePlayer(historic)

  //Very Important!!! We are implementing immutability (Generating a new copy in memory) to reset the gameBoard each time to game finish
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  let winner;
  //The game is draw if there is no winner or the quantity of historics are 9 (the Board game has 9 squares)
  const isDraw = !winner && historic.length == 9

  /**
   * The code you have shared iterates over each element of the historic array and updates the state of the gameBoard with the information of each move recorded in the history.
   *  It uses the destructuring of the objects.
   */
  historic.forEach(element => {
    const { square, player } = element; //Stores both objects as a variable
    const { row, col } = square; //Take the coordinates from the position in GameBoard
    gameBoard[row][col] = player; //Assign the player's symbol to that position
  });

  /**
   * It restarts game
   */
  function handleRestartGame(){
      setHistoric([])
  }

  /**
   * We set the name of each player to show the winner
   * @param {*} symbol 
   * @param {*} newName 
   */
  function handlePlayersName(symbol, newName){
    setPlayers(players => {
      return {
        ...players,
        [symbol] : newName
      }
    })
  };

  /** 
   * We are now looking at all the combinations in search of the winner
   */
  WINNING_COMBINATIONS.forEach(combination => {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if (firstSquareSymbol != null && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      // we asume the first symbol (X or O) has three in line, so that's the winner
      winner = players[firstSquareSymbol]
    }
  })

  function handleSelectSquare(rowIndex, colIndex) {
    setHistoric(previousHistoric => {
      console.log(previousHistoric)
      //We set the current player sending the current array with the historic
      const activePlayer = helperActivePlayer(previousHistoric);

      //We are storing into the array from State() each both objects (square, player) each turn of the player
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...previousHistoric]
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className={activePlayer === playerOne ? 'highlight-player' : 'highlight-player-two'}>
          <Player initialName={"Player 1"} symbol={playerOne} isActive={activePlayer === playerOne} onChangeName={handlePlayersName}/>
          <Player initialName={"Player 2"} symbol={playerTwo} isActive={activePlayer === playerTwo} onChangeName={handlePlayersName}/>
        </ol>

        {(winner || isDraw) && <GameOver winner={winner} isEndGame={handleRestartGame}/>}

        {/* paramenter 'historic' send an array of historic to the GameBoard component */}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log historic={historic} currentPlayer={players}/>
    </main>
  )
}

export default App
