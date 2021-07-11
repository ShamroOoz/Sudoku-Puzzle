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

export const DIFFICULTY = {
  Easy: 62,
  Medium: 53,
  Hard: 44,
  "Very Hard": 35,
  Insane: 26,
  Inhuman: 17,
};
export const ACTIONS = {
  DEFAULT: "use default",
  SUCCESS: "success",
  SOLVE: "solve",
  CLEAR: "clear",
};

export const STATUS = {
  ABORT: "abort",
  VALID: "valid",
  INVALID: "invalid",
  COMPLETED: "completed",
  UNKNOWN: "unknown",
  TIMER: "timer",
  SOLVE: "solve",
  DIFFICULTY: "difficulty",
};

export const STRING_BOARD_LENGTH = 81;
export const STRING_BOARD_MIN_LENGTH = 17;
export const BLANK_CHAR = ".";
export const emptySudokuString = ".".repeat(STRING_BOARD_LENGTH);
export const validStringRegExp = /^(([1-9]|\.)+|\W+)$/g;
