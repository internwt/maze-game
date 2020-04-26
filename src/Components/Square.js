import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

function Square(props) {

    return (
      <button className="square" onClick={() => props.onClick()}>
        <img src={props.element} style={{ display: props.display }} />
      </button>
    );
  }

export default Square