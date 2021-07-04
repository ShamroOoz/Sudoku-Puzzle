import { addSolutionStepsLog } from "./Logs";
import { digits, rows, cols, rRows, cCols, STRATEGIES } from "./Constants";

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

export const member = (item, list) => {
  for (const elem of list) {
    if (item === elem) {
      return true;
    }
  }
  return false;
};

export const Squares = () => {
  return cross(rows, cols);
};

export const squares = Squares();

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

export const UnitList = () => {
  return [
    ...cols.map((col) => cross(rows, [col])),
    ...rows.map((row) => cross([row], cols)),
    ...sectionList,
  ];
};

export const unitList = UnitList();

export const Units = () => {
  return squares.reduce((units, key) => {
    units[key] = unitList.filter((ul) => member(key, ul));
    return units;
  }, []);
};

export const units = Units();

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

const getSectionUnits = (sectionNumber, values) => {
  let cellRows = [];
  let sectionRow = [];
  for (let i = 1; i <= sectionList[sectionNumber - 1]?.length; i++) {
    const unit = sectionList[sectionNumber - 1][i - 1];
    sectionRow.push({
      key: unit,
      value: values[unit]?.length === 1 ? values[unit] : ".",
    });
    if (i % 3 === 0) {
      cellRows = [...cellRows, sectionRow];
      sectionRow = [];
    }
  }
  return cellRows;
};

// Transform a valid sudoku model into an UI Board state
export const generateValuesState = (values) => {
  let valuesState = [];
  let sectionRows = [];
  for (const sectionNumber of digits.split("")) {
    sectionRows.push({
      key: String(sectionNumber),
      cellRows: getSectionUnits(sectionNumber, values),
    });
    if (sectionNumber % 3 === 0) {
      valuesState = [...valuesState, [...sectionRows]];
      sectionRows = [];
    }
  }
  return valuesState;
};

// Generate a board state based on a valid sudoku string.
export const getBoardState = (values) => {
  const data = { sections: generateValuesState(values) };
  console.log(data);
  return data;
};

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

// check if all list values are valid with cb
export const all = (list, cb) => {
  for (const value of list) {
    if (!cb(value)) {
      return false;
    }
  }
  return true;
};

// check if an unit is resolved.

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
