import { DIFFICULTY, emptySudokuString, BLANK_CHAR } from "./Constants";
import { parseGrid, assign } from "./Solver";
import { squares as SQUARES } from "./Utils";

const rand_range = (max, min) => {
  /* Get a random integer in the range of `min` to `max` (non inclusive).
        If `min` not defined, default to 0. If `max` not defined, throw an 
        error.
        */
  min = min || 0;
  if (max) {
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    return false;
  }
};

const shuffle = (seq) => {
  /* Return a shuffled version of `seq`
   */

  // Create an array of the same size as `seq` filled with false
  let shuffled = [];
  // eslint-disable-next-line no-unused-vars
  for (const i in seq) {
    shuffled.push(false);
  }

  for (const i in seq) {
    let ti = rand_range(seq.length);
    while (shuffled[ti]) {
      ti = ti + 1 > seq.length - 1 ? 0 : ti + 1;
    }

    shuffled[ti] = seq[i];
  }

  return shuffled;
};

export const generatePuzzle = (difficulty = null) => {
  const array = Object.keys(DIFFICULTY);
  // If `difficulty` is a string or null, convert it to a number or
  if (typeof difficulty === "string" || difficulty === null) {
    difficulty =
      DIFFICULTY[difficulty] ||
      DIFFICULTY[array[Math.floor(Math.random() * array.length)]];
  }

  // Get a set of squares and all possible candidates for each square
  const candidates = parseGrid(emptySudokuString);
  // For each item in a shuffled list of squares
  const shuffled_squares = shuffle(SQUARES);

  for (const square of shuffled_squares) {
    // If an assignment of a random chioce causes a contradictoin, give
    // up and try again
    const rand_candidate_idx = rand_range(candidates[square].length);
    const rand_candidate = candidates[square][rand_candidate_idx];
    if (!assign(candidates, square, rand_candidate)) {
      break;
    }
    // Make a list of all single candidates
    const single_candidates = [];
    for (const si of SQUARES) {
      if (candidates[si].length === 1) {
        single_candidates.push(candidates[si]);
      }
    }

    // If we have at least difficulty, and the unique candidate count is
    // at least 8, return the puzzle!
    if (single_candidates.length >= difficulty) {
      let board = "";
      for (const square of SQUARES) {
        if (candidates[square].length === 1) {
          board += candidates[square];
        } else {
          board += BLANK_CHAR;
        }
      }
      // Double check board is solvable
      if (board && parseGrid(board)) {
        return board;
      }
    }
  }
  // Give up and try a new puzzle
  return generatePuzzle(difficulty);
};
