import React, { useReducer, useState } from "react";
import {
  Header,
  Button,
  Board,
  Layout,
  StatusMessage,
  Loading,
} from "./components";

import { appReducer, initialState } from "./Reducer";
import { ACTIONS } from "./services/Constants";
import { getinitialSudokuString } from "./services/Utils";
import Solver from "./services/Solver";
// import { generatePuzzle } from "./services/generater";

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

  // useEffect(() => {
  //   generatePuzzle("inhuman");
  // }, []);

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
    <div>
      {isSolving && <Loading />}
      <Header />
      <Layout label="1">
        <Board board={initialBoardState} name="initial" />
        <div className="space-x-3">
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
        <StatusMessage status={initialBoardStatus} />
      </Layout>
      {isShow && (
        <>
          <Layout label="2">
            <div>
              <Button click={solverListner} label="Solve" />
            </div>
            <Board board={solveBoardState} name="solver" />
            <div>
              <Button click={() => clearrListner()} label="Clear" />
            </div>
            <StatusMessage status={timerSolveBoard} timeElapsed={timeElapsed} />
            <StatusMessage status={solveBoardStatus} />
            <StatusMessage status={solveBoardAbort} />
          </Layout>
        </>
      )}
      <Layout label="3">
        <div>
          <Button click={solverListner} label="Generate" />
        </div>
      </Layout>
    </div>
  );
};

export default App;
