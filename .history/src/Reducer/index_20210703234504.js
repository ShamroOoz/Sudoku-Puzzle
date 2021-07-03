import { initialSudokuString } from "../services/Constants";
import { getBoardState } from "../services/Utils";
import { parseGrid } from "../services/Solver";

export const appReducer = (state, action) => {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const initialBoardParsed = parseGrid(initialSudokuString);
console.log("reducer", initialBoardParsed);
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
