import { initialSudokuString } from "../../services/Solver/constants";
import { getBoardState } from "../../services/Solver/utils";
import { parseGrid } from "../../services/Solver/solver";

export const appReducer = (state, action) => {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const initialBoardParsed = parseGrid(initialSudokuString);

export const initialState = {
  //   currentBoardString: initialSudokuString,
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
