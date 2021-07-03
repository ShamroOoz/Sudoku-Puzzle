import React, { useReducer } from "react";
import Header from "./components/Header";
import Circle from "./components/Circle";
import Button from "./components/Button";
import Board from "./components/Board";
import "./App.css";

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div className="App">
      <Header />
      <div className="App-body App-container">
        <div className="App-game-panel">
          <Circle classes="circle center-me" label="1" />
          <Button
            classes="btn marginTop15"
            // click={() => dispatch({ type: ACTIONS.OPEN })}
            label="Load New Board"
          />

          <Board
            classes="game-board"
            // board={initialBoardState}
            name="initial"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
