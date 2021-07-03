import React from "react";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="App-body App-container">
        <div className="App-game-panel">
          <Circle classes="circle center-me" label="1" />
        </div>
      </div>
    </div>
  );
};

export default App;
