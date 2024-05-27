export default function GameOver({ winner, isEndGame }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner}  has won!</p>}
            {!winner && <p>It's a draw!</p>}
            <button onClick={isEndGame}>Rematch</button>
        </div>
    )
}