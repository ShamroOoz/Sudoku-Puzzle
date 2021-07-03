export const appReducer = (state, action) => {
  switch (action.type) {
  }
};

export const initialState = {
  //   currentBoardString: initialSudokuString,
  //   initialBoardParsed: initialBoardParsed,
  //   initialBoardState: getBoardState(initialBoardParsed),
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
