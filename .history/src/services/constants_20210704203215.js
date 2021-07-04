export const digits = "123456789";
export const letters = "ABCDEFGHI";
export const rows = letters.split("");
export const cols = digits.split("");

export const rRows = [
  ["A", "B", "C"],
  ["D", "E", "F"],
  ["G", "H", "I"],
];

export const cCols = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

export const STRATEGIES = {
  HIDDEN_SINGLE: "Hidden Single in cell",
  NAKED_SINGLE: "Naked Single in cell",
  POINTING_PAIRS: "Pointing Pair in cells",
  BACKTRACKING: "Backtracking search",
};

export const ACTIONS = {
  OPEN: "open load",
  CLOSE: "close load",
  DEFAULT: "use default",
  CHANGE: "change",
  RANDOM: "random",
  SUCCESS: "success",
  SOLVE: "solve",
  CLEAR: "clear",
  RESET: "reset",
  SET: "set",
  RELOAD: "reload",
};

export const STATUS = {
  ABORT: "abort",
  VALID: "valid",
  INVALID: "invalid",
  COMPLETED: "completed",
  UNKNOWN: "unknown",
  TIMER: "timer",
  SOLVE: "solve",
};

export const STRING_BOARD_LENGTH = 81;
export const emptySudokuString = ".".repeat(STRING_BOARD_LENGTH);

// Default sudoku string (valid)
export const initialSudokuString =
  "7...9...32..468..1..8...6...4..2..9....3.4....8..1..3...9...7..5..142..68...5...2";

export const hardSudokuString =
  ".....6....59.....82....8....45........3........6..3.54...325..6..................";