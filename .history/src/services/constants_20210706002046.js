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
export const emptySudokuString =
  ".17..69..356194.2..89..71.6.65...273872563419.43...685521......798..53..634...59.";
export const validStringRegExp = /^(([1-9]|\.)+|\W+)$/g;
