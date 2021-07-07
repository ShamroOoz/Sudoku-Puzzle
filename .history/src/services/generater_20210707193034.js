/* eslint-disable no-redeclare */
/* eslint-disable no-throw-literal */
import {
  rows,
  cols,
  DIFFICULTY,
  STRING_BOARD_LENGTH,
  STRING_BOARD_MIN_LENGTH,
  emptySudokuString,
  digits,
  BLANK_CHAR,
} from "./Constants";
import { parseGrid } from "./Solver";
import {
  cross,
  _get_all_units,
  _get_square_units_map,
  _get_square_peers_map,
} from "./Utils";

// Minimum number of givens
var SQUARES = cross(rows, cols);
var UNITS = _get_all_units(rows, cols);
var SQUARE_UNITS_MAP = _get_square_units_map(SQUARES, UNITS); // Squares -> units map
var SQUARE_PEERS_MAP = _get_square_peers_map(SQUARES, SQUARE_UNITS_MAP); // Squares -> peers ma

const _force_range = (nr, max, min) => {
  /* Force `nr` to be within the range from `min` to, but not including, 
        `max`. `min` is optional, and will default to 0. If `nr` is undefined,
        treat it as zero.
        */
  min = min || 0;
  nr = nr || 0;
  if (nr < min) {
    return min;
  }
  if (nr > max) {
    return max;
  }
  return nr;
};

const _in = (v, seq) => {
  /* Return if a value `v` is in sequence `seq`.
   */
  return seq.indexOf(v) !== -1;
};
const validate_board = (board) => {
  /* Return if the given `board` is valid or not. If it's valid, return
        true. If it's not, return a string of the reason why it's not.
        */

  // Check for empty board
  if (!board) {
    return "Empty board";
  }

  // Invalid board length
  if (board.length !== STRING_BOARD_LENGTH) {
    return (
      "Invalid board size. Board must be exactly " +
      STRING_BOARD_LENGTH +
      " squares."
    );
  }

  // Check for invalid characters
  for (const i in board) {
    if (!_in(board[i], digits) && board[i] !== BLANK_CHAR) {
      return (
        "Invalid board character encountered at index " + i + ": " + board[i]
      );
    }
  }

  // Otherwise, we're good. Return true.
  return true;
};

const _get_square_vals_map = (board) => {
  /* Return a map of squares -> values
   */
  const squares_vals_map = {};

  // Make sure `board` is a string of length 81
  if (board.length !== SQUARES.length) {
    return "Board/squares length mismatch.";
  } else {
    for (const i in SQUARES) {
      squares_vals_map[SQUARES[i]] = board[i];
    }
  }

  return squares_vals_map;
};

const _eliminate = function (candidates, square, val) {
  /* Eliminate `val` from `candidates` at `square`, (candidates[square]),
        and propagate when values or places <= 2. Return updated candidates,
        unless a contradiction is detected, in which case, return false.
        
        WARNING: This will modify the contents of `candidates` directly.
        */

  // If `val` has already been eliminated from candidates[square], return
  // with candidates.
  if (!_in(val, candidates[square])) {
    return candidates;
  }

  // Remove `val` from candidates[square]
  candidates[square] = candidates[square].replace(val, "");

  // If the square has only candidate left, eliminate that value from its
  // peers
  const nr_candidates = candidates[square].length;
  if (nr_candidates === 1) {
    const target_val = candidates[square];

    for (const pi in SQUARE_PEERS_MAP[square]) {
      const peer = SQUARE_PEERS_MAP[square][pi];

      const candidates_new = _eliminate(candidates, peer, target_val);

      if (!candidates_new) {
        return false;
      }
    }

    // Otherwise, if the square has no candidates, we have a contradiction.
    // Return false.
  }
  if (nr_candidates === 0) {
    return false;
  }

  // If a unit is reduced to only one place for a value, then assign it
  for (const ui in SQUARE_UNITS_MAP[square]) {
    const unit = SQUARE_UNITS_MAP[square][ui];

    const val_places = [];
    for (const si in unit) {
      const unit_square = unit[si];
      if (_in(val, candidates[unit_square])) {
        val_places.push(unit_square);
      }
    }

    // If there's no place for this value, we have a contradition!
    // return false
    if (val_places.length === 0) {
      return false;

      // Otherwise the value can only be in one place. Assign it there.
    } else if (val_places.length === 1) {
      var candidates_new = _assign(candidates, val_places[0], val);

      if (!candidates_new) {
        return false;
      }
    }
  }

  return candidates;
};

const _assign = (candidates, square, val) => {
  /* Eliminate all values, *except* for `val`, from `candidates` at 
        `square` (candidates[square]), and propagate. Return the candidates map
        when finished. If a contradiciton is found, return false.
        
        WARNING: This will modify the contents of `candidates` directly.
        */

  // Grab a list of canidates without 'val'
  const other_vals = candidates[square].replace(val, "");

  // Loop through all other values and eliminate them from the candidates
  // at the current square, and propigate. If at any point we get a
  // contradiction, return false.
  for (const ovi in other_vals) {
    const other_val = other_vals[ovi];

    const candidates_next = _eliminate(candidates, square, other_val);

    if (!candidates_next) {
      //console.log("Contradiction found by _eliminate.");
      return false;
    }
  }

  return candidates;
};

const _get_candidates_map = (board) => {
  /* Get all possible candidates for each square as a map in the form
        {square: sudoku.DIGITS} using recursive constraint propagation. Return `false` 
        if a contradiction is encountered
        */

  // Assure a valid board
  const report = validate_board(board);
  if (report !== true) {
    return report;
  }

  const candidate_map = {};
  const squares_values_map = _get_square_vals_map(board);

  // Start by assigning every digit as a candidate to every square
  for (const si in SQUARES) {
    candidate_map[SQUARES[si]] = digits;
  }

  // For each non-blank square, assign its value in the candidate map and
  // propigate.
  for (const square in squares_values_map) {
    const val = squares_values_map[square];

    if (_in(val, digits)) {
      const new_candidates = _assign(candidate_map, square, val);

      // Fail if we can't assign val to square
      if (!new_candidates) {
        return false;
      }
    }
  }
  return candidate_map;
};

const _rand_range = (max, min) => {
  /* Get a random integer in the range of `min` to `max` (non inclusive).
        If `min` not defined, default to 0. If `max` not defined, throw an 
        error.
        */
  min = min || 0;
  if (max) {
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    throw "Range undefined";
  }
};

const _shuffle = (seq) => {
  /* Return a shuffled version of `seq`
   */

  // Create an array of the same size as `seq` filled with false
  var shuffled = [];
  for (var i = 0; i < seq.length; ++i) {
    shuffled.push(false);
  }

  for (var i in seq) {
    var ti = _rand_range(seq.length);

    while (shuffled[ti]) {
      ti = ti + 1 > seq.length - 1 ? 0 : ti + 1;
    }

    shuffled[ti] = seq[i];
  }

  return shuffled;
};

const _strip_dups = (seq) => {
  /* Strip duplicate values from `seq`
   */
  var seq_set = [];
  var dup_map = {};
  for (var i in seq) {
    var e = seq[i];
    if (!dup_map[e]) {
      seq_set.push(e);
      dup_map[e] = true;
    }
  }
  return seq_set;
};
export const generatePuzzle = (difficulty, unique) => {
  const array = Object.keys(DIFFICULTY);
  // If `difficulty` is a string or undefined, convert it to a number or
  // default it to "easy" if undefined.
  if (typeof difficulty === "string" || difficulty === null) {
    difficulty =
      DIFFICULTY[difficulty] ||
      DIFFICULTY[array[Math.floor(Math.random() * array.length)]];
  }

  // Force difficulty between 17 and 81 inclusive
  difficulty = _force_range(
    difficulty,
    STRING_BOARD_LENGTH + 1,
    STRING_BOARD_MIN_LENGTH
  );

  // Default unique to true
  unique = unique || true;

  // Get a set of squares and all possible candidates for each square
  const candidates = _get_candidates_map(emptySudokuString);

  // For each item in a shuffled list of squares
  const shuffled_squares = _shuffle(SQUARES);
  for (const si in shuffled_squares) {
    const square = shuffled_squares[si];

    // If an assignment of a random chioce causes a contradictoin, give
    // up and try again
    const rand_candidate_idx = _rand_range(candidates[square].length);
    const rand_candidate = candidates[square][rand_candidate_idx];
    if (!_assign(candidates, square, rand_candidate)) {
      break;
    }

    // Make a list of all single candidates
    const single_candidates = [];
    for (const si in SQUARES) {
      const square = SQUARES[si];

      if (candidates[square].length === 1) {
        single_candidates.push(candidates[square]);
      }
    }

    // If we have at least difficulty, and the unique candidate count is
    // at least 8, return the puzzle!
    if (
      single_candidates.length >= difficulty &&
      _strip_dups(single_candidates).length >= 8
    ) {
      const board = "";
      const givens_idxs = [];
      for (const i in SQUARES) {
        const square = SQUARES[i];
        if (candidates[square].length === 1) {
          board += candidates[square];
          givens_idxs.push(i);
        } else {
          board += BLANK_CHAR;
        }
      }

      // If we have more than `difficulty` givens, remove some random
      // givens until we're down to exactly `difficulty`
      var nr_givens = givens_idxs.length;
      if (nr_givens > difficulty) {
        givens_idxs = _shuffle(givens_idxs);
        for (var i = 0; i < nr_givens - difficulty; ++i) {
          var target = parseInt(givens_idxs[i]);
          board =
            board.substr(0, target) + BLANK_CHAR + board.substr(target + 1);
        }
      }

      // Double check board is solvable
      // TODO: Make a standalone board checker. Solve is expensive.
      if (board && parseGrid(board)) {
        return board;
      }
    }
  }

  // Give up and try a new puzzle
  return generatePuzzle(difficulty);
};