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
import { generatePuzzle } from "./services/generater";

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
    newBoardString,
  } = state;

  // useEffect(() => {
  //   generatePuzzle("inhuman");
  // }, []);

  const solverListner = async () => {
    try {
      const result = await Solver(initialBoardParsed);
      dispatch({ type: ACTIONS.SUCCESS, result: result });
      dispatch({ type: ACTIONS.SOLVE });
    } catch (error) {
      console.log(error);
    }
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
  const generateListner = () => {
    dispatch({
      type: ACTIONS.DEFAULT,
      initialstring: generatePuzzle("inhuman"),
    });
  };

  if (isSolving) return <Loading />;
  return (
    <div>
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
          <Button click={generateListner} label="Generate" />
        </div>
        <Board board={newBoardString} name="initial" />
      </Layout>
    </div>
  );
};

export default App;
