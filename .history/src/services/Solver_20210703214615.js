import { digits, STRATEGIES } from "./Constants";
import { setSolverStrategy } from "./Logs";
import { dict, squares } from "./Utils";

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

  return values;
};
