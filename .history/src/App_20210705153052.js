import React, { useReducer, useState } from "react";
import Header from "./components/Header";
import Circle from "./components/Circle";
import Button from "./components/Button";
import Board from "./components/Board";
import StatusMessage from "./components/StatusMessage";
import { appReducer, initialState } from "./Reducer";
import { ACTIONS } from "./services/Constants";
import { getinitialSudokuString } from "./services/Utils";
import Solver from "./services/Solver";
import "./App.css";
import Layout from "./components/Layout";

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isShow, setisShow] = useState(false);
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

  const solverListner = () => {
    dispatch({ type: ACTIONS.SOLVE });

    Solver(initialBoardParsed).then((result) => {
      dispatch({ type: ACTIONS.SUCCESS, result: result });
    });
  };

  const clearrListner = () => {
    dispatch({ type: ACTIONS.CLEAR });
    setisShow(false);
  };

  const getinitialstringListner = (url) => {
    getinitialSudokuString(url).then((initialstring) => {
      dispatch({ type: ACTIONS.DEFAULT, initialstring: initialstring });
      setisShow(true);
    });
  };

  return (
    <div className="text-center">
      <Header />
      {/* <Layout /> */}
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
              click={() => getinitialstringListner("easy")}
              label="Puzzle 1"
            />
            <Button
              click={() => getinitialstringListner("medium")}
              label="Puzzle 2"
            />
            <Button
              click={() => getinitialstringListner("hard")}
              label="Puzzle 3"
            />
            <Button
              click={() => getinitialstringListner("evil")}
              label="Puzzle 4"
            />
          </div>
          <StatusMessage
            classes="App-message-row"
            status={initialBoardStatus}
          />
        </div>

        {isShow && (
          <div className="App-game-panel">
            <Circle classes="circle center-me" label="2" />
            <div>
              <Button
                isSpinning={isSolving}
                click={solverListner}
                label="Solve"
              />
            </div>
            <Board classes="game-board" board={solveBoardState} name="solver" />
            <div className="buttons-row">
              <Button click={() => clearrListner()} label="Clear" />
            </div>
            <StatusMessage
              classes="App-message-row"
              status={timerSolveBoard}
              timeElapsed={timeElapsed}
            />
            <StatusMessage
              classes="App-message-row"
              status={solveBoardStatus}
            />
            <StatusMessage classes="App-message-row" status={solveBoardAbort} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
