import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Square from './Square'
import '../index.css';
function Board(props){
    let totalSquares = props.width * props.height;
     const [squares,setSquares] = useState([])
    //  const [marioLocation,setMarioLocation]= useState()
     const [gameInitialized,setgameInitialized] = useState(false)
     const [moves,setMoves] = useState(0)
     const [xMoves,setXmoves] = useState(0)
     const [yMoves,setYmoves] = useState(0)
     const [lastMove,setLastMove] = useState('+y')
     const [marioLocation,setMarioLocation] = useState(Math.floor(Math.random() * (totalSquares - 0) + 0),)

  
  
    useEffect(()=> {
      setTimeout(() => {
       killEnemies();
      }, 100);
    },[])
  
   function handleClick(i) {
      if (i === marioLocation)  killEnemies();
    }
  
    function moveInY(direction) {
      if (
        direction === '+'
        && (marioLocation + 1 - props.height) > 0
      ) {
        console.log('Moving in +y directions');
        let newSquares =  squares.slice();
        newSquares[marioLocation] = {
          element: '', display: 'none'
        };
        newSquares[marioLocation - props.height] = {
          element: 'mario.png', display: 'block'
        };
        
         setgameInitialized(true)
         setMarioLocation(marioLocation-props.height)
         setSquares(newSquares)
         setXmoves(0)
         setYmoves(yMoves+1)
         setMoves(moves+1)
         setLastMove('y')
        
      } else if (
        direction === '-' &&
        (marioLocation + props.height) < totalSquares
      ) {
        console.log('Moving in -y direction');
        let newSquares = squares.slice();
        newSquares[marioLocation] = {
          element: '', display: 'none'
        };
        newSquares[marioLocation + props.height] = {
          element: 'mario.png', display: 'block'
        };
        setgameInitialized(true)
        setMarioLocation(marioLocation + props.height)
        setSquares(newSquares)
        setXmoves(0)
        setYmoves(yMoves+1)
        setMoves(moves+1)
        setLastMove('-y')
      
      } else {
       lastMove === '+y'
          ? moveInY('-')
          : lastMove === '-y'
            ? moveInY('+')
            :   setLastMove('+y')
      }
    }
  
   function  moveInX(direction) {
      if (
        direction === '+'
        && (marioLocation + 2) % props.width !== 1
        && (marioLocation + 1) < totalSquares
      ) {
        let newSquares = squares.slice();
        newSquares[marioLocation] = {
          element: '', display: 'none'
        };
        newSquares[marioLocation + 1] = {
          element: 'mario.png', display: 'block'
        };
        setgameInitialized(true)
        setMarioLocation(marioLocation +1)
        setSquares(newSquares)
        setXmoves(xMoves+1)
        setYmoves(0)
        setMoves(moves+1)
        setLastMove('+x')
       
      } else if (
        direction === '-'
        && (marioLocation) %props.width !== 0
        && (marioLocation - 1) >= 0
      ) {
        console.log('Moving in -x direction');
        let newSquares = squares.slice();
        newSquares[marioLocation] = {
          element: '', display: 'none'
        };
        newSquares[marioLocation - 1] = {
          element: 'mario.png', display: 'block'
        };
        setgameInitialized(true)
        setMarioLocation(marioLocation +1)
        setSquares(newSquares)
        setXmoves(xMoves+1)
        setYmoves(0)
        setMoves(moves+1)
        setLastMove('-x')
      } else {
       lastMove === '+x'
          ? moveInX('-')
          : lastMove === '-x'
            ?moveInX('+')
            :  setLastMove('+x')
      }
    }
  
  function  getMarioRange() {
      let marioLoc = marioLocation;
      let marioRange = [];
      for (let i = 0; i < props.height; i++) {
        if (
          marioLoc >= (i *props.width)
          && marioLoc < (i * props.width) + props.width
        ) {
          marioRange = [
            (i *props.width),
            (i * props.width) +props.width
          ];
        }
  
      }
      console.log('Mario Range: ', marioRange);
      return marioRange
    }
  
    function numberInRange(x, range) {
      return x >= range[0] && x < range[1];
    }
  
   function decideMove(enemyLocations) {
      console.log('Enemy Locations: ', enemyLocations);
      let distance = Math.abs(
        enemyLocations[0] - marioLocation
      );
      let marioRange = getMarioRange();
      if (
        distance <props.width
        && enemyLocations[0] < marioLocation
        && numberInRange(enemyLocations[0], marioRange)
      ) {
        moveInX('-');
      } else if (
        distance < props.width
        && enemyLocations[0] < marioLocation
        && !numberInRange(enemyLocations[0], marioRange)
      ) {
        moveInY('+');
      } else if (
        distance < props.width
        && enemyLocations[0] > marioLocation
        && numberInRange(enemyLocations[0], marioRange)
      ) {
        moveInX('+');
      } else if (
        distance <props.width
        && enemyLocations[0] > marioLocation
        && !numberInRange(enemyLocations[0], marioRange)
      ) {
        moveInY('-');
      } else if (
        distance >= props.width
        && enemyLocations[0] < marioLocation
      ) {
       moveInY('+');
      } else {
        moveInY('-');
      }
    }
  
    function  killEnemies() {
      console.log('checking for enemies: ');
      let enemies = squares.filter(square => {
        return square.element === 'enemy.png';
      });
      console.log('Total enemies: ', enemies);
      if (enemies.length === 0) {
        alert('Game over. Total moves to save princess: ' + moves);
      } else {
        decideMove(enemies.map((enemy) => enemy.value));
      }
    }
  
  function   renderSquare(i, element, display) {
      return <Square key={i}
        value={i} element={squares[i].element} displayElement={squares[i].display}
        onClick={() => handleClick(i)}
      />;
    }
  
   function renderRows(squares) {
      return (<div className="board-row">
        {squares}
      </div>);
    }
  
   function renderBoard() {
      let board = [];
      let rows = [];
      for (let i = 0, squareNumber = 0; i < props.height; i++) {
        for (let j = 0; j < props.width; j++) {
          rows.push(
           renderSquare(
              squareNumber
            )
          );
          squareNumber++;
        }
        board.push(renderRows(rows));
        rows = [];
      }
      return board;
    }
  
      if (!gameInitialized) {
        let luckySquares = [];
        for (let i = 0; i < Math.floor(Math.sqrt(totalSquares)) + 1; i++) {
          luckySquares.push(
            Math.floor(Math.random() * (totalSquares))
          );
        };
        console.log('calculating luck squares: ', luckySquares);
        let squareNumber = 0;
        for (let i = 0; i < props.height; i++) {
          for (let j = 0; j <props.width; j++) {
            let element = squareNumber === marioLocation ? "mario.png" : luckySquares.includes(squareNumber) ? "enemy.png" : "";
            let display = luckySquares.includes(squareNumber) || squareNumber === marioLocation ? "block" : "none";
            squares.push({ element, display, value: squareNumber });
            squareNumber++;
          }
        }
      }
      return (
        <div>
          {renderBoard()}
        </div>
      );
    }

  export default Board
  