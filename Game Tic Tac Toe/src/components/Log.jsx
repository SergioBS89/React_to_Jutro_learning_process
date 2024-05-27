export default function Log({ historic, currentPlayer }) {
    return (
        <ol id="log">
            {historic.map(his =>
                <li key={`${his.square.row}${his.square.col}`}>
                    <p className={his.player == 'O' ? 'playerOneLog' : 'playerTwoLog'}>{currentPlayer[his.player]} choose square: {his.square.row}, {his.square.col}</p>
                </li>)}
        </ol>
    );
}