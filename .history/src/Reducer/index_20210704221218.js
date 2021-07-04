import {
  ACTIONS,
  STATUS,
  initialSudokuString,
  emptySudokuString,
} from "../services/Constants";

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
        solveBoardState: getBoardState(resultBoardParsed),
        initialBoardParsed: initialBoardParsed,
        initialBoardState: getBoardState(initialBoardParsed),
      };
    }
    case ACTIONS.CLEAR: {
      const initialBoardParsed = parseGrid(state.currentBoardString);
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
        currentBoardString: action.initialstring,
        initialBoardParsed: initialBoardParsed,
        initialBoardState: getBoardState(initialBoardParsed),
      };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const initialBoardParsed = parseGrid(initialSudokuString);
const emptyBoardParsed = parseGrid(emptySudokuString);

export const initialState = {
  currentBoardString: emptySudokuString,
  initialBoardParsed: emptyBoardParsed,
  initialBoardState: getBoardState(emptyBoardParsed),
  initialBoardStatus: STATUS.UNKNOWN,
  solveBoardState: getBoardState(emptyBoardParsed),
  solveBoardStatus: STATUS.UNKNOWN,
  solveBoardAbort: false,
  timeElapsed: 0,
  timerSolveBoard: STATUS.UNKNOWN,
  isSolving: false,
  // newBoardString: "",
};