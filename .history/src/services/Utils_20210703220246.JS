import { rows, cols, rRows, cCols, STRATEGIES } from "./Constants";
import { addSolutionStepsLog } from "./Logs";

// Cross product of elements in A and elements in B.
export const cross = (listA, listB) => {
  const crossProduct = [];
  for (const a of listA) {
    for (const b of listB) {
      crossProduct.push(a + b);
    }
  }
  return crossProduct;
};
export const Squares = () => {
  return cross(rows, cols);
};

export const squares = Squares();

export const dict = (keys, values) => {
  if (typeof values === "string" || values === null) {
    return keys.reduce((result, key) => ({ ...result, [key]: values }), {});
  } else if (typeof values === "object") {
    return keys.reduce(
      (result, key, i) => ({ ...result, [key]: values[i] }),
      {}
    );
  }
};

export const Peers = () => {
  let peers = {};
  for (const square of squares) {
    peers[square] = {};
    for (const unit of units[square]) {
      for (const square2 of unit) {
        if (square2 !== square) {
          peers[square][square2] = true;
        }
      }
    }
  }
  return peers;
};

export const peers = Peers();

export const Units = () => {
  return squares.reduce((units, key) => {
    units[key] = unitList.filter((ul) => member(key, ul));
    return units;
  }, []);
};

export const units = Units();

export const member = (item, list) => {
  for (const elem of list) {
    if (item === elem) {
      return true;
    }
  }
  return false;
};

export const UnitList = () => {
  return [
    ...cols.map((col) => cross(rows, [col])),
    ...rows.map((row) => cross([row], cols)),
    ...sectionList,
  ];
};

export const unitList = UnitList();

export const SectionList = () => {
  const sectionList = [];
  for (const rs of rRows) {
    for (const cs of cCols) {
      sectionList.push(cross(rs, cs));
    }
  }
  return sectionList;
};

export const sectionList = SectionList();

export const all = (list, cb) => {
  for (const value of list) {
    if (!cb(value)) {
      return false;
    }
  }
  return true;
};

export const log = (strategy, squares, digit) => {
  if (strategy === STRATEGIES.BACKTRACKING) {
    addSolutionStepsLog(
      strategy,
      [],
      0,
      "Backtrack Search",
      "From this point was applied Peter Norvig's backtracking search algorithm that to solve every sudoku puzzle."
    );
  } else {
    const squareMsg =
      squares.length > 1 ? squares[0] + ", " + squares[1] : squares[0];
    const msg =
      squares.length === 1
        ? "was solved with the value: " + digit
        : "These cells are the only cells in section with the candidate value " +
          digit +
          ". The candidate must be in one of these cells and can be removed from other cells in column or row.";
    addSolutionStepsLog(
      strategy,
      [...squares],
      digit,
      strategy + " ( " + squareMsg + " )",
      strategy + " ( " + squareMsg + " ) " + msg
    );
  }
};
