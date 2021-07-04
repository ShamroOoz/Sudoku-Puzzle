import React, { useReducer } from "react";
import Header from "./components/Header";
import Circle from "./components/Circle";
import Button from "./components/Button";
import Board from "./components/Board";
import StatusMessage from "./components/StatusMessage";
import { appReducer, initialState } from "./Reducer";
import { ACTIONS } from "./services/Constants";
import Solver from "./services/Solver";
import "./App.css";

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const {
    initialBoardParsed,
    initialBoardState,
    initialBoardStatus,
    solveBoardState,
    timeElapsed,
    timerSolveBoard,
    solveBoardStatus,
    solveBoardAbort,
    isSolving,
  } = state;

  const solverHandler = () => {
    dispatch({ type: ACTIONS.SOLVE });

    Solver(initialBoardParsed).then((result) => {
      dispatch({ type: ACTIONS.SUCCESS, result: result });
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="App-body App-container">
        <div className="App-game-panel">
          <Circle classes="circle center-me" label="1" />
          <Board
            classes="game-board"
            board={initialBoardState}
            name="initial"
          />

          <div className="buttons-row">
            <Button
              classes="btn btn-small"
              click={() => dispatch({ type: ACTIONS.DEFAULT })}
              label="initial"
            />
            <Button
              classes="btn btn-small"
              click={() => dispatch({ type: ACTIONS.DEFAULT })}
              label="Medium"
            />
            <Button
              classes="btn btn-small"
              click={() => dispatch({ type: ACTIONS.DEFAULT })}
              label="Hard"
            />
            <Button
              classes="btn btn-small"
              click={() => dispatch({ type: ACTIONS.DEFAULT })}
              label="Evil"
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
              isSpinning={isSolving}
              click={solverHandler}
              label="Solve"
            />
          </div>
          <Board classes="game-board" board={solveBoardState} name="solver" />
          <div className="buttons-row">
            <Button
              classes="btn btn-small marginLeft10"
              click={() => dispatch({ type: ACTIONS.CLEAR })}
              label="Clear"
            />
          </div>
          <StatusMessage
            classes="App-message-row"
            status={timerSolveBoard}
            timeElapsed={timeElapsed}
          />
          <StatusMessage classes="App-message-row" status={solveBoardStatus} />
          <StatusMessage classes="App-message-row" status={solveBoardAbort} />
        </div>
      </div>
    </div>
  );
};

export default App;
