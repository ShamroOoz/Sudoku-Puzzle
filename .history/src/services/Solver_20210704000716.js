import { digits, STRATEGIES } from "./Constants";
import { setSolverStrategy } from "./Logs";
import { dict, squares, peers, all, log } from "./Utils";

export const assign = (values, square, digit) => {
  // Eliminate all the other values (except digit) from values[square] and propagate.
  // Return values, except return false if a contradiction is detected.
  const otherValues = values[square].replace(digit, "").split("");
  const isAssigned = all(otherValues, (otherValue) =>
    eliminate(values, square, otherValue)
  );
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
    if (isSafePropagated) {
      log(STRATEGIES.NAKED_SINGLE, [square], oneValue);
    } else {
      return false;
    }
  }
};

export const parseGrid = (grid) => {
  setSolverStrategy(STRATEGIES.BACKTRACKING);
  // Convert grid to a dict of possible values, {square: digits}, or
  // return False if a contradiction is detected.
  const values = dict(squares, digits);
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
  console.log(values);
  return values;
};

const gridValues = (grid) => {
  //Convert grid into a dict of {square: char} with '0' or '.' for empties.
  // eslint-disable-next-line no-useless-escape
  const parseGrid = grid.replace(/[^0-9\.]/g, "");
  return dict(squares, parseGrid.split(""));
};
