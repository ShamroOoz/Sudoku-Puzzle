import { digits, STRATEGIES, STATUS } from "./Constants";
import { setSolverStrategy, startTimer } from "./Logs";
import { dict, squares, peers, all, log, isSolved, isCompleted } from "./Utils";

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

  //   for (const square in input) {
  //     const value = input[square];
  //     // square value could be '.' or 1..9
  //     const isAssignableValue =
  //       digits.indexOf(value) === -1 || assign(values, square, value);
  //     if (!isAssignableValue) {
  //       return false; // (Fail if we can't assign value to square.)
  //     }
  //   }
  return input;
};

const gridValues = (grid) => {
  //Convert grid into a dict of {square: char} with '0' or '.' for empties.
  // eslint-disable-next-line no-useless-escape
  const parseGrid = grid.replace(/[^0-9\.]/g, "");
  return dict(squares, parseGrid.split(""));
};

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
    solveBoardResult.solutionSteps = getLog("solutionSteps");

    if (!solved) {
      console.log(display(analysisBoard));
    }
    return solveBoardResult;
  } catch (error) {
    return solveBoardResult;
  }
};
