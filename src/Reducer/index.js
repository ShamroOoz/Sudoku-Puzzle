import { ACTIONS, STATUS, emptySudokuString } from "../services/Constants";

import { getBoardState } from "../services/Utils";
import { parseGrid } from "../services/Solver";

const reset = (state) => {
  const emptyBoardParsed = parseGrid(emptySudokuString);
  return {
    ...state,
    solveBoardState: getBoardState(emptyBoardParsed),
    initialBoardStatus: STATUS.UNKNOWN,
    solveBoardStatus: STATUS.UNKNOWN,
    solveBoardAbort: STATUS.UNKNOWN,
    timerSolveBoard: STATUS.UNKNOWN,
    timeElapsed: 0,
    boardDifficultyStatus: STATUS.UNKNOWN,
    boardDifficulty: STATUS.UNKNOWN,
  };
};
export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SOLVE: {
      return {
        ...state,
        isSolving: true,
      };
    }

    case ACTIONS.SUCCESS: {
      const initialBoardParsed = parseGrid(state.currentBoardString);
      const result = action.result;
      const resultBoardParsed = result.board;
      return {
        ...state,
        isSolving: false,
        solveBoardStatus: result.status,
        initialBoardStatus: STATUS.UNKNOWN,
        solveBoardAbort: result.abort ? STATUS.ABORT : STATUS.UNKNOWN,
        timerSolveBoard: result.abort ? STATUS.ABORT : STATUS.TIMER,
        timeElapsed: result.timer.toFixed(2),
        boardDifficultyStatus: result.difficulty
          ? STATUS.DIFFICULTY
          : STATUS.UNKNOWN,
        boardDifficulty: result.difficulty ? result.difficulty : STATUS.UNKNOWN,
        solveBoardState: getBoardState(resultBoardParsed),
        initialBoardParsed: initialBoardParsed,
        initialBoardState: getBoardState(initialBoardParsed),
      };
    }
    case ACTIONS.CLEAR: {
      const initialBoardParsed = parseGrid(emptySudokuString);
      return {
        ...reset(state),
        initialBoardParsed: initialBoardParsed,
        initialBoardState: getBoardState(initialBoardParsed),
      };
    }

    case ACTIONS.DEFAULT: {
      const initialBoardParsed = parseGrid(action.initialstring);
      return {
        ...reset(state),
        currentBoardString: initialBoardParsed
          ? action.initialstring
          : emptySudokuString,
        initialBoardParsed: initialBoardParsed
          ? initialBoardParsed
          : emptyBoardParsed,
        initialBoardState: getBoardState(
          initialBoardParsed ? initialBoardParsed : emptyBoardParsed
        ),
        solveBoardState: getBoardState(
          initialBoardParsed ? initialBoardParsed : null
        ),
      };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const emptyBoardParsed = parseGrid(emptySudokuString);

export const initialState = {
  currentBoardString: emptySudokuString,
  initialBoardParsed: emptyBoardParsed,
  initialBoardState: getBoardState(emptyBoardParsed),
  solveBoardState: null,
  initialBoardStatus: STATUS.UNKNOWN,
  solveBoardStatus: STATUS.UNKNOWN,
  solveBoardAbort: false,
  boardDifficultyStatus: STATUS.UNKNOWN,
  boardDifficulty: STATUS.UNKNOWN,
  timeElapsed: STATUS.UNKNOWN,
  timerSolveBoard: STATUS.UNKNOWN,
  isSolving: false,
};
