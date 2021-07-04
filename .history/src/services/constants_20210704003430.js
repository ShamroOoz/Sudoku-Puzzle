export const digits = "123456789";
export const letters = "ABCDEFGHI";
export const rows = letters.split("");
export const rows = digits.split("");
console.log(rows, rows);
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
  "4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......";
