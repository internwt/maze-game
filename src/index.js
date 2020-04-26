import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Components/Board'
import './index.css';




const  Game=()=> {
  function sanitizeInput(input, dimension) {
    let output;
    output = parseInt(input);
    if (Number.isNaN(output)) {
      return {
        valid: false,
        msg: `${input} not valid. 
        Please enter a valid integer for ${dimension}`
      };
    } else if (output < 0) {
      return {
        valid: false,
        msg: `${input} not valid. 
          Please enter a positive integer for ${dimension}`
      };
    } else {
      return {
        valid: true,
        output
      };
    }

  }
    let width = sanitizeInput(
      prompt("Please enter board width"),
      'width'
    );
    while (!width.valid) {
      width = sanitizeInput(prompt(width.msg), 'width');
    }

    let height =sanitizeInput(
      prompt("Please enter board height"),
      'height'
    );
    while (!height.valid) {
      height = sanitizeInput(prompt(height.msg), 'height');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board width={width.output} height={height.output} />
        </div>
      </div>
    );
}



ReactDOM.render(
  <Game />,
  document.getElementById('root')
);