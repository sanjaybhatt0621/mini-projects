
import { useState } from "react";

const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,5,7],
    [2,6,8],
    [0,4,8],
    [2,4,6],
]



function Square({value, onSquareClick}) {

    return <button className="sqaure" onClick={onSquareClick} >{value}</button>
}



function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    
    

    function calculateWinner() {
        for(let i=0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const winner = calculateWinner();
    let gameStatus;
    if(winner) {
        gameStatus = `Winner: ${winner}`;
    }
    else {
        gameStatus = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(i) {
        if(squares[i] || calculateWinner()) {
            return;
        }
        const nextSquares = squares.slice();
        if(xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }
    return (
        <>
            <div className="status">{gameStatus}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    )
}


export default function Game() {

    const [history, setHistory] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <ol></ol>
            </div>
        </div>
    )
}