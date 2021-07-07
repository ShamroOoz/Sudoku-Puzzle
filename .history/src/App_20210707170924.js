import React, { useReducer, useState } from "react";
import {
  Header,
  Button,
  Board,
  Layout,
  StatusMessage,
  Loading,
  DropMenu,
} from "./components";

import { appReducer, initialState } from "./Reducer";
import { ACTIONS, DIFFICULTY } from "./services/Constants";
import { getinitialSudokuString } from "./services/Utils";
import Solver from "./services/Solver";
import { generatePuzzle } from "./services/generater";

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isDisplay, setisDisplay] = useState(false);
  const [isShow, setisShow] = useState(false);
  const [difficultyState, setdifficultyState] = useState(null);
  const {
    currentBoardString,
    initialBoardParsed,
    initialBoardState,
    initialBoardStatus,
    solveBoardState,
    timeElapsed,
    timerSolveBoard,
    solveBoardStatus,
    solveBoardAbort,
    isSolving,
    boardDifficultyStatus,
    boardDifficulty,
  } = state;

  const solverListner = async () => {
    try {
      dispatch({ type: ACTIONS.SOLVE });
      const result = await Solver(initialBoardParsed, currentBoardString);
      dispatch({ type: ACTIONS.SUCCESS, result: result });
    } catch (error) {
      console.log(error);
    }
  };

  const clearrListner = () => {
    setdifficultyState(null);
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
    const a = Math.floor(Math.random() * (DIFFICULTY.length - 0 + 1)) + min;
    console.log(difficultyState);
    console.log(a);
    // dispatch({
    //   type: ACTIONS.DEFAULT,
    //   initialstring: generatePuzzle(difficultyState),
    // });
    // setisShow(true);
  };

  return (
    <div>
      <Header />
      {isSolving && <Loading />}

      {!isDisplay ? (
        // part 1
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
          <div>
            <Button click={() => setisDisplay(true)} label="Generator" />
          </div>

          <StatusMessage status={initialBoardStatus} />
        </Layout>
      ) : (
        // Part 3
        <Layout label="3">
          <div className="flex items-center justify-center space-x-3">
            <DropMenu setdifficultyState={setdifficultyState} />
            <Button click={generateListner} label="Generate" />
          </div>
          <Board board={initialBoardState} name="initial" />
          <div>
            <Button click={() => setisDisplay(false)} label="Back" />
          </div>
        </Layout>
      )}

      {/* Part 2 */}
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
            <StatusMessage
              status={boardDifficultyStatus}
              timeElapsed={boardDifficulty}
            />
            <StatusMessage status={timerSolveBoard} timeElapsed={timeElapsed} />
            <StatusMessage status={solveBoardStatus} />
            <StatusMessage status={solveBoardAbort} />
          </Layout>
        </>
      )}
    </div>
  );
};

export default App;
