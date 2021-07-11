import { digits, STATUS } from "./Constants";
import { startTimer, stopTimer } from "./Utils";
import {
  dict,
  squares,
  peers,
  all,
  isSolved,
  isCompleted,
  units,
  getSquaresWithFewestCandidates,
  copy,
  some,
  difficultyCounter,
} from "./Utils";

export const assign = (values, square, digit) => {
  // Eliminate all the other values (except digit) from values[square] and propagate.
  // Return values, except return false if a contradiction is detected.
  const otherValues = values[square].replace(digit, "").split("");
  const isAssigned = all(otherValues, (otherValue) => {
    return eliminate(values, square, otherValue);
  });
  if (isAssigned) {
    return values;
  } else {
    return false;
  }
};

export const eliminate = (values, square, digit) => {
  //Eliminate digit from values[square]; propagate when values or places <= 2.
  //return values, except return false if a contradiction is detected.

  const isDigitPresent = values[square].indexOf(digit) !== -1;

  if (!isDigitPresent) {
    // already eliminated.
    return values;
  }

  values[square] = values[square].replace(digit, "");

  // (1) If a square is reduced to oneValue, then eliminate oneValue
  // from the peers.
  const possibleValues = values[square];
  const isSquareContradicted = possibleValues.length === 0;
  const isSquareSolved = possibleValues.length === 1;
  if (isSquareContradicted) {
    // Contradiction: removed last value
    return false;
  } else if (isSquareSolved) {
    // Propagate change
    const oneValue = possibleValues;
    const peersSquares = Object.keys(peers[square]);
    const isSafePropagated = all(peersSquares, (peerSquare) =>
      eliminate(values, peerSquare, oneValue)
    );
    if (!isSafePropagated) {
      return false;
    }
  }

  //  (2) If a unit is reduced to only one place for a value digit, then put it there.
  for (const unit of units[square]) {
    const digitPlaces = unit.filter(
      (square) => values[square].indexOf(digit) !== -1
    );
    const areAnyPlaces = digitPlaces.length > 0;
    const isOnlyOnePlace = digitPlaces.length === 1;

    if (!areAnyPlaces) {
      // Contradiction: no place for this value
      return false;
    } else if (isOnlyOnePlace) {
      // digit can only be in one place in unit; assign it there
      if (!assign(values, digitPlaces[0], digit)) {
        return false;
      }
    }
  }

  return values;
};

export const parseGrid = (grid) => {
  // Convert grid to a dict of possible values, {square: digits}, or
  // return False if a contradiction is detected.

  //GENRATE A RADOM STRING return object{A1:123456789,A2:123456789}
  const values = dict(squares, digits);
  //return object{A1: excat value . or 1-9 according to gird}
  const input = gridValues(grid);

  for (const square in input) {
    const value = input[square];
    // square value could be '.' or 1..9
    const isAssignableValue =
      digits.indexOf(value) === -1 || assign(values, square, value);
    if (!isAssignableValue) {
      return false; // (Fail if we can't assign value to square.)
    }
  }
  return values;
};

const gridValues = (grid) => {
  //Convert grid into a dict of {square: char} with  '.' for empties.
  // eslint-disable-next-line no-useless-escape
  const parseGrid = grid.replace(/[^0-9\.]/g, "");
  return dict(squares, parseGrid.split(""));
};

export const search = (values) => {
  // Failed earlier
  if (!values) return false;

  // Solved!
  if (isCompleted(values)) return values;

  // Chose the unfilled square with the fewest candidate possibilities
  const square = getSquaresWithFewestCandidates(values)[0];
  const digits = values[square].split("");

  // Using depth-first search and propagation, try all possible values.
  return some(digits, (digit) => search(assign(copy(values), square, digit)));
};

/************************** End Backtrack Search  ***********************************/

export const Solver = async (values, grid) => {
  let isAborted = false;
  let solved = isSolved(values);
  let completed = solved || isCompleted(values);

  const solveBoardResult = {
    timer: 0,
    board: values,
    status: solved ? STATUS.VALID : STATUS.INVALID,
    abort: isAborted,
    completed: completed,
    difficulty: difficultyCounter(grid),
  };

  if (completed) return solveBoardResult;

  let analysisBoard = values;
  let solveTimer = startTimer();

  try {
    // Loop until the board is solved or completed or aborted.
    // This in case the board will be returned with a non valid state.
    while (!solved && !completed) {
      // if board is still unsolved, use backtrack search
      analysisBoard = search(analysisBoard);
      solved = isSolved(analysisBoard);
      completed = isCompleted(analysisBoard);
      isAborted = !solved;
    }

    solveBoardResult.board = analysisBoard;
    solveBoardResult.timer = stopTimer(solveTimer);
    solveBoardResult.status = solved ? STATUS.VALID : STATUS.INVALID;
    solveBoardResult.abort = isAborted;
    solveBoardResult.completed = completed;

    return solveBoardResult;
  } catch (error) {
    console.log(error);
    return solveBoardResult;
  }
};
