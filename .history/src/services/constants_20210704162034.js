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

// Default sudoku string (valid)
export const initialSudokuString =
  ".....6....59.....82....8....45........3........6..3.54...325..6..................";
