import {
  ACTIONS,
  initialSudokuString,
  STATUS,
  hardSudokuString,
  emptySudokuString,
} from "../services/Constants";

import { getBoardState } from "../services/Utils";
import { parseGrid } from "../services/Solver";

const reset = (state) => {
  // const emptyBoardParsed = parseGrid(emptySudokuString);
  return {
    ...state,
    solveBoardState: getBoardState(emptyBoardParsed),
    initialBoardStatus: STATUS.UNKNOWN,
    solveBoardStatus: STATUS.UNKNOWN,
    solveBoardAbort: STATUS.UNKNOWN,
    timerSolveBoard: STATUS.UNKNOWN,
    // timeElapsed: 0,
    // solutionSteps: resetLog("solutionSteps"),
    // openModal: false,
    // modalError: "",
  };
};
export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CLEAR: {
      const initialBoardParsed = parseGrid(state.currentBoardString);
      return {
        ...reset(state),
        initialBoardParsed: initialBoardParsed,
        initialBoardState: getBoardState(initialBoardParsed),
      };
    }

    case ACTIONS.DEFAULT: {
      const initialBoardParsed = parseGrid(hardSudokuString);
      return {
        ...reset(state),
        currentBoardString: hardSudokuString,
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
  currentBoardString: initialSudokuString,
  initialBoardParsed: initialBoardParsed,
  initialBoardState: getBoardState(initialBoardParsed),
  initialBoardStatus: STATUS.UNKNOWN,
  solveBoardState: getBoardState(emptyBoardParsed),
  solveBoardStatus: STATUS.UNKNOWN,
  solveBoardAbort: false,
  // isSolving: false,
  // solutionSteps: [],
  // newBoardString: "",
  // //   timerSolveBoard: STATUS.UNKNOWN,
  // timeElapsed: 0,
  // openModal: false,
  // modalError: "",
};
