import { useState, useActionState } from 'react';
import { Container, Table, Image, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import dice1 from './assets/dice_1.png';
import dice2 from './assets/dice_2.png';
import dice3 from './assets/dice_3.png';
import dice4 from './assets/dice_4.png';
import dice5 from './assets/dice_5.png';
import dice6 from './assets/dice_6.png';

function App() {
  // Dice state
  const [dice1, rollDice1] = useActionState(
    (prevState) => Math.floor(Math.random() * 6) + 1,
    1 
  );
  const [dice2, rollDice2] = useActionState(
    (prevState) => Math.floor(Math.random() * 6) + 1,
    1 
  );

  // Players positions
  const [positionPlayer1, setPositionPlayer1] = useState(1);
  const [positionPlayer2, setPositionPlayer2] = useState(1);

  // Game state
  const [gameWinner, setGameWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const myarray = [
  "/assets/dice_1.png",
  "/assets/dice_2.png",
  "/assets/dice_3.png",
  "/assets/dice_4.png",
  "/assets/dice_5.png",
  "/assets/dice_6.png"
];

  // Move Player 1
  const movePlayer1 = () => {
    setPositionPlayer1((prev) => {
      const nextPosition = prev + dice1;
      if (nextPosition >= 30) {
        setGameWinner("Player 1");
        return 30;
      }
      return nextPosition;
    });
    setCurrentPlayer(2);
  };

  // Move Player 2  
  const movePlayer2 = () => {
    setPositionPlayer2((prev) => {
      const nextPosition = prev + dice2;
      if (nextPosition >= 30) {
        setGameWinner("Player 2");
        return 30;
      }
      return nextPosition;
    });
    setCurrentPlayer(1);
  };

  // Reset Game
  const resetGame = () => {
    setPositionPlayer1(1);
    setPositionPlayer2(1);
    setGameWinner(null);
    setCurrentPlayer(1);
    rollDice1();
    rollDice2();
  };

  return (
    <Container className="text-center mt-5 p-4">
      <div className="game-header">
        <h1 className="title mb-4">🎲 Dice Game - 2 Players</h1>
        
        {/* Winner Message */}
        {gameWinner && (
          <Alert variant="success" className="winner-alert mx-auto" style={{maxWidth: '500px'}}>
            <h3>🏆 **{gameWinner} ΝΙΚΗΣΕ!** 🏆</h3>
            <Button variant="warning" onClick={resetGame} className="mt-2">
              🔄 Νέο Παιχνίδι
            </Button>
          </Alert>
        )}

        {/* Current Player */}
        {!gameWinner && (
          <div className="current-player">
            <h4>🎯 Σειρά: **Player {currentPlayer}**</h4>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="game-board">
        <Table bordered striped className="board-table">
          <tbody>
            <tr>
              {Array.from({ length: 30 }, (_, i) => {
                const positionNum = i + 1;
                const isPlayer1 = positionNum === positionPlayer1;
                const isPlayer2 = positionNum === positionPlayer2;
                let cellContent = positionNum;

                if (isPlayer1 && isPlayer2) {
                  cellContent = '👑'; // Tie
                } else if (isPlayer1) {
                  cellContent = '🔴 Player 1';
                } else if (isPlayer2) {
                  cellContent = '🔵 Player 2';
                }

                return (
                  <td 
                    key={positionNum} 
                    className={`board-cell ${isPlayer1 ? 'player1' : ''} ${isPlayer2 ? 'player2' : ''}`}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Controls */}
      <div className="controls mt-5">
        <div className="player-section">
          <h3>🔴 Player 1</h3>
          <Image 
            src={myarray[dice1 - 1]} 
            className="dice-image" 
            onClick={rollDice1}
          />
          <h4>Dice: {dice1}</h4>
          <Button 
            variant="primary" 
            onClick={movePlayer1}
            disabled={currentPlayer !== 1 || gameWinner}
            className="move-btn"
          >
            Move Player 1
          </Button>
          <p>Position: {positionPlayer1}/30</p>
        </div>

        <div className="player-section">
          <h3>🔵 Player 2</h3>
          <Image 
            src={myarray[dice2 - 1]} 
            className="dice-image" 
            onClick={rollDice2}
          />
          <h4>Dice: {dice2}</h4>
          <Button 
            variant="info" 
            onClick={movePlayer2}
            disabled={currentPlayer !== 2 || gameWinner}
            className="move-btn"
          >
            Move Player 2
          </Button>
          <p>Position: {positionPlayer2}/30</p>
        </div>
      </div>

      {!gameWinner && (
        <Button 
          variant="secondary" 
          onClick={resetGame} 
          className="reset-btn mt-4"
        >
          🔄 Reset Game
        </Button>
      )}
    </Container>
  );
}

export default App;
