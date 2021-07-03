import React from "react";
import Header from "./components/Header";
import Circle from "./components/Circle";
import Button from "./components/Button";
import "./App.css";

const App = () => {
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
        </div>
      </div>
    </div>
  );
};

export default App;
