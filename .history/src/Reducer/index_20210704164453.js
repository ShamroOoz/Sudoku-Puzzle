import {
  ACTIONS,
  initialSudokuString,
  emptySudokuString,
  STATUS,
} from "../../services/Solver/constants";

import { getBoardState } from "../services/Utils";
import { parseGrid } from "../services/Solver";

const reset = (state) => {
  const emptyBoardParsed = parseGrid(emptySudokuString);
  return {
    ...state,
    initialBoardStatus: STATUS.UNKNOWN,
    solveBoardStatus: STATUS.UNKNOWN,
    solveBoardAbort: STATUS.UNKNOWN,
    // solutionSteps: resetLog("solutionSteps"),
    solveBoardState: getBoardState(emptyBoardParsed),
    openModal: false,
    timerSolveBoard: STATUS.UNKNOWN,
    timeElapsed: 0,
    modalError: "",
  };
};
export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.DEFAULT: {
      const initialBoardParsed = parseGrid(initialSudokuString);
      return {
        ...reset(state),
        initialBoardParsed: initialBoardParsed,
        initialBoardState: getBoardState(initialBoardParsed),
        currentBoardString: initialSudokuString,
      };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const initialBoardParsed = parseGrid(initialSudokuString);

export const initialState = {
  currentBoardString: initialSudokuString,
  initialBoardParsed: initialBoardParsed,
  initialBoardState: getBoardState(initialBoardParsed),
  //   initialBoardStatus: STATUS.UNKNOWN,
  //   solveBoardState: getBoardState(emptyBoardParsed),
  //   solveBoardStatus: STATUS.UNKNOWN,
  solveBoardAbort: false,
  isSolving: false,
  solutionSteps: [],
  newBoardString: "",
  //   timerSolveBoard: STATUS.UNKNOWN,
  timeElapsed: 0,
  openModal: false,
  modalError: "",
};
