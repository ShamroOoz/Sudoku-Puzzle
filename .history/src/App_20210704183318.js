import React, { useReducer } from "react";
import Header from "./components/Header";
import Circle from "./components/Circle";
import Button from "./components/Button";
import Board from "./components/Board";
import StatusMessage from "./components/StatusMessage";
import { appReducer, initialState } from "./Reducer";
import { ACTIONS } from "./services/Constants";
import "./App.css";

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const { initialBoardState, initialBoardStatus } = state;
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
            board={initialBoardState}
            name="initial"
          />

          <div className="buttons-row">
            <Button
              classes="btn btn-small"
              click={() => dispatch({ type: ACTIONS.DEFAULT })}
              label="Use Hard exapmle"
            />
          </div>
          <StatusMessage
            classes="App-message-row"
            status={initialBoardStatus}
          />
        </div>
        <div className="App-game-panel">
          <Circle classes="circle center-me" label="2" />
          <div>
            <Button
              classes="btn marginTop15"
              // isSpinning={isSolving}
              // click={solverHandler}
              label="Solve"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
