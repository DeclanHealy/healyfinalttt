import React, { useState } from 'react';
import './index.css';

const Square = ({ value, onClick, onMouseEnter, onMouseLeave, hoverValue }) => {
  return (
    <div
      className="square"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={`value ${value}`}>{value}</span>
      {hoverValue && <span className={`hover-value ${hoverValue}`}>{hoverValue}</span>}
    </div>
  );
};

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(null); // null indicates game hasn't started
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleMouseEnter = (index) => {
    if (!board[index] && !calculateWinner(board)) {
      setHoverIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const winner = calculateWinner(board);
  const isTie = !winner && board.every(square => square !== null);

  const startGame = (firstPlayer) => {
    setBoard(Array(9).fill(null));
    setIsXNext(firstPlayer === 'X');
    setHoverIndex(null);
  };

  if (isXNext === null) {
    return (
      <div className="start-screen">
        <h1>Tic Tac Toe</h1>
        <button onClick={() => startGame('X')}>X Goes First</button>
        <button onClick={() => startGame('O')}>O Goes First</button>
        <button onClick={() => startGame(Math.random() > 0.5 ? 'X' : 'O')}>
          Random Player Goes First
        </button>
      </div>
    );
  }

  return (
    <div className="game">
      <div className="board">
        {board.map((square, index) => (
          <Square
            key={index}
            value={square}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            hoverValue={
              hoverIndex === index
                ? isXNext
                  ? 'X'
                  : 'O'
                : null
            }
          />
        ))}
      </div>
      {winner ? (
        <div className="winner-screen">
          <h2>{winner} Wins!</h2>
          <button onClick={() => startGame('X')}>X Goes First</button>
          <button onClick={() => startGame('O')}>O Goes First</button>
          <button onClick={() => startGame(Math.random() > 0.5 ? 'X' : 'O')}>
            Random Player Goes First
          </button>
        </div>
      ) : isTie ? (
        <div className="tie-screen">
          <h2>It's a Tie!</h2>
          <button onClick={() => startGame('X')}>X Goes First</button>
          <button onClick={() => startGame('O')}>O Goes First</button>
          <button onClick={() => startGame(Math.random() > 0.5 ? 'X' : 'O')}>
            Random Player Goes First
          </button>
        </div>
      ) : null}
    </div>
  );
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default App;