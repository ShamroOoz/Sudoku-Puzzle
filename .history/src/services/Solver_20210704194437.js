import { digits, STRATEGIES, STATUS } from "./Constants";
import { setSolverStrategy, startTimer, stopTimer } from "./Logs";
import {
  dict,
  squares,
  peers,
  all,
  log,
  isSolved,
  isCompleted,
  sectionList,
  unsolvedSquares,
  units,
  getSquareUnitRowCol,
  getPeers,
  hasPairValues,
  canEliminate,
  getPairSquares,
  getSquaresWithFewestCandidates,
  copy,
  some,
} from "./Utils";

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
  return values;
};

const gridValues = (grid) => {
  //Convert grid into a dict of {square: char} with '0' or '.' for empties.
  // eslint-disable-next-line no-useless-escape
  const parseGrid = grid.replace(/[^0-9\.]/g, "");
  return dict(squares, parseGrid.split(""));
};

export const search = (values) => {
  // Set a global flag to stop collecting solution steps
  setSolverStrategy(STRATEGIES.BACKTRACKING);

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
/**
 * Pointing Pairs with Constraint Propagation
 *
 * Looking at each unsolved unit in turn there may be two occurrences
 * of a particular digit. If these digits are aligned on a single row or column,
 * we can remove any digit occurs anywhere else on the row or column outside the unit
 *
 */

export const searchPointPair = async (values) => {
  setSolverStrategy(STRATEGIES.POINTING_PAIRS);

  // Failed earlier
  if (!values) return false;

  // Solved!
  if (isCompleted(values)) return values;

  for (const section of sectionList) {
    for (const square of unsolvedSquares(section, values)) {
      const digits = values[square].split("");
      if (!all(digits, (digit) => findPointPair(values, square, digit))) {
        return false;
      }
    }
  }
  return values;
};

export const findPointPair = (values, square, digit) => {
  const [unitCol, unitRow, unit] = units[square];
  const [unitRows, unitCols] = getSquareUnitRowCol(unit, square);
  const [rowPeers, colPeers, unitRowPeers, unitColPeers] = getPeers(
    unit,
    unitRow,
    unitRows,
    unitCol,
    unitCols,
    values
  );

  if (hasPairValues(unit, values, digit)) {
    if (hasPairValues(unitRows, values, digit)) {
      // aligned on a single row
      const areRowPeerValuesEliminated = eliminatePeerValues(
        rowPeers,
        values,
        digit
      );
      if (areRowPeerValuesEliminated) {
        const pairSquaresCol = getPairSquares(unitRows, values, digit);
        log(STRATEGIES.POINTING_PAIRS, pairSquaresCol, digit);
      }
    } else if (hasPairValues(unitCols, values, digit)) {
      // aligned on a single column
      const areColPeerValuesEliminated = eliminatePeerValues(
        colPeers,
        values,
        digit
      );
      if (areColPeerValuesEliminated) {
        const pairSquaresRow = getPairSquares(unitCols, values, digit);
        log(STRATEGIES.POINTING_PAIRS, pairSquaresRow, digit);
      }
    }
  } else if (
    hasPairValues(unitCols, values, digit) &&
    !canEliminate(colPeers, values, digit)
  ) {
    const areUnitColPeerValuesEliminated = eliminatePeerValues(
      unitColPeers,
      values,
      digit
    );
    if (areUnitColPeerValuesEliminated) {
      const pairSquaresCol = getPairSquares(unitCols, values, digit);
      log(STRATEGIES.POINTING_PAIRS, pairSquaresCol, digit);
    }
  } else if (
    hasPairValues(unitRows, values, digit) &&
    !canEliminate(rowPeers, values, digit)
  ) {
    const areUnitRowPeerValuesEliminated = eliminatePeerValues(
      unitRowPeers,
      values,
      digit
    );
    if (areUnitRowPeerValuesEliminated) {
      const pairSquaresRow = getPairSquares(unitRows, values, digit);
      log(STRATEGIES.POINTING_PAIRS, pairSquaresRow, digit);
    }
  }

  return values;
};

export const eliminatePeerValues = (peers, values, digit) =>
  canEliminate(peers, values, digit) &&
  all(peers, (sq) => eliminate(values, sq, digit));

export const Solver = async (values) => {
  let loopCounter = 0;
  const loopLimit = 5;
  let isAborted,
    stopLoop = false;

  let solved = isSolved(values);
  let completed = solved || isCompleted(values);

  const solveBoardResult = {
    timer: 0,
    board: values,
    status: solved ? STATUS.VALID : STATUS.INVALID,
    abort: isAborted,
    completed: completed,
    solutionSteps: [],
  };
  if (completed) return solveBoardResult;
  let analysisBoard = values;
  let solveTimer = startTimer();

  try {
    // Loop until the board is solved or completed or aborted.
    // This in case the board will be returned with a non valid state.

    while (!solved && !completed && !stopLoop) {
      // Start solving strategies
      analysisBoard = await searchPointPair(analysisBoard);
      // Add new solvers here, i.e:
      // analysisBoard = await searchHiddenPairsTriples(analysisBoard);
      // analysisBoard = await searchNakedHiddenQuads(analysisBoard);
      // analysisBoard = await searchBoxLineReduction(analysisBoard);
      // End solving strategies

      solved = isSolved(analysisBoard);
      completed = isCompleted(analysisBoard);
      loopCounter++;
      if (!solved && loopCounter >= loopLimit) {
        // if board is still unsolved, use backtrack search
        log(STRATEGIES.BACKTRACKING);
        analysisBoard = search(analysisBoard);
        solved = isSolved(analysisBoard);
        completed = isCompleted(analysisBoard);
        isAborted = !solved;
        stopLoop = true;
      }
    }
    solveBoardResult.board = analysisBoard;
    solveBoardResult.timer = stopTimer(solveTimer);
    solveBoardResult.status = solved ? STATUS.VALID : STATUS.INVALID;
    solveBoardResult.abort = isAborted;
    solveBoardResult.completed = completed;
    // solveBoardResult.solutionSteps = getLog("solutionSteps");

    if (!solved) {
      console.log(analysisBoard);
    }
    return solveBoardResult;
  } catch (error) {
    return solveBoardResult;
  }
};
