/* eslint-disable array-callback-return */
import {
  digits,
  rows,
  cols,
  rRows,
  cCols,
  validStringRegExp,
  STRING_BOARD_LENGTH,
  DIFFICULTY,
} from "./Constants";

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
  for (let i = 1; i <= sectionList[sectionNumber - 1].length; i++) {
    const unit = sectionList[sectionNumber - 1][i - 1];
    sectionRow.push({
      key: unit,
      value: values[unit].length === 1 ? values[unit] : ".",
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
  if (values) return { sections: generateValuesState(values) };
};

export const copy = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = copy(value);
  }

  return outObject;
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

export const center = (s, w) => {
  let excess = w - s.length;
  while (excess > 0) {
    if (excess % 2) s += " ";
    else s = " " + s;
    excess -= 1;
  }
  return s;
};

export const display = (values) => {
  // Used for debugging
  let width = 0;
  for (const s in squares) {
    if (values[squares[s]].length > width) width = values[squares[s]].length;
  }

  width += 1;
  let seg = "";
  for (let i = 0; i < width; i++) seg += "---";
  const line = "\n" + [seg, seg, seg].join("+");
  let board = "";
  for (const r in rows) {
    for (const c in cols) {
      board += center(values[rows[r] + cols[c]], width);
      if (c === 2 || c === 5) board += "|";
    }
    if (r === 2 || r === 5) board += line;
    board += "\n";
  }
  board += "\n";
  return board;
};

export const isCompleted = (values) => {
  return all(Object.values(values), (square) => square.length === 1);
};

//Return some element of values that is true.
export const some = (values, cb) => {
  for (const digit of values) {
    const response = cb(digit);
    if (response) {
      return response;
    }
  }
  return false;
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
export const isUnitSolved = (unit, values) => {
  return (
    unit
      .map((square) => values[square])
      .sort()
      .join("") === digits
  );
};

export const isSolved = (values) => {
  //A puzzle is solved if each unit is a permutation of the digits 1 to 9.
  return (
    values !== false && all(unitList, (unit) => isUnitSolved(unit, values))
  );
};

export const getSquaresWithFewestCandidates = (values) => {
  return squares
    .filter((square) => values[square].length > 1)
    .sort((s1, s2) => values[s1].length - values[s2].length);
};

export const hasPairValues = (list, values, digit) =>
  list.filter(
    (square) => values[square].length > 1 && values[square].includes(digit)
  ).length === 2;

export const getPairSquares = (list, values, digit) =>
  list.filter((square) => values[square].includes(digit));

export const getOuterPeers = (innerList, outerList, values) =>
  innerList.filter(
    (square) => !outerList.includes(square) && values[square].length > 1
  );

export const unsolvedSquares = (list, values) =>
  list.filter((square) => values[square].length > 1);

export const canEliminate = (list, values, digit) =>
  list.filter((square) => values[square].includes(digit)).length > 0;

export const getSquareUnitRowCol = (unit, square) => [
  unit.filter((sq) => sq.includes(square[0])),
  unit.filter((sq) => sq.includes(square[1])),
];

export const getPeers = (
  unit,
  unitRow,
  unitRows,
  unitCol,
  unitCols,
  values
) => [
  getOuterPeers(unitRow, unitRows, values),
  getOuterPeers(unitCol, unitCols, values),
  getOuterPeers(unit, unitRows, values),
  getOuterPeers(unit, unitCols, values),
];

export const stringBoardValidation = async (entryString) => {
  if (!entryString) {
    return false;
  }

  if (!validStringRegExp.test(entryString)) {
    return false;
  }

  if (entryString.length !== STRING_BOARD_LENGTH) {
    return false;
  }

  return true;
};

export const getinitialSudokuString = async (url) => {
  try {
    const API_URL = `https://sudoku-puzzle-qlik.netlify.app/${url}.txt`;

    const res = await fetch(API_URL);
    const initialString = await res.text();
    // eslint-disable-next-line no-useless-escape
    const parseGridstring = initialString.replace(/[^0-9\.]/g, "");
    const valid = stringBoardValidation(parseGridstring);
    if (!valid) {
      console.log("something wrong with string");
      return false;
    }
    return parseGridstring;
  } catch (error) {
    console.log(error);
  }
};

export const startTimer = () => {
  return Date.now();
};

export const stopTimer = (startTimer) => {
  return Date.now() - startTimer;
};

export const _get_all_units = (rows, cols) => {
  /* Return a list of all units (rows, cols, boxes)
   */
  var units = [];

  // Rows
  for (var ri in rows) {
    units.push(cross(rows[ri], cols));
  }

  // Columns
  for (var ci in cols) {
    units.push(cross(rows, cols[ci]));
  }

  // Boxes
  var row_squares = ["ABC", "DEF", "GHI"];
  var col_squares = ["123", "456", "789"];
  for (var rsi in row_squares) {
    for (var csi in col_squares) {
      units.push(cross(row_squares[rsi], col_squares[csi]));
    }
  }

  return units;
};

export const _get_square_units_map = (squares, units) => {
  /* Return a map of `squares` and their associated units (row, col, box)
   */
  var square_unit_map = {};

  // For every square...
  for (var si in squares) {
    var cur_square = squares[si];

    // Maintain a list of the current square's units
    var cur_square_units = [];

    // Look through the units, and see if the current square is in it,
    // and if so, add it to the list of of the square's units.
    for (var ui in units) {
      var cur_unit = units[ui];

      if (cur_unit.indexOf(cur_square) !== -1) {
        cur_square_units.push(cur_unit);
      }
    }

    // Save the current square and its units to the map
    square_unit_map[cur_square] = cur_square_units;
  }

  return square_unit_map;
};

export const _get_square_peers_map = (squares, units_map) => {
  /* Return a map of `squares` and their associated peers, i.e., a set of
        other squares in the square's unit.
        */
  var square_peers_map = {};

  // For every square...
  for (var si in squares) {
    var cur_square = squares[si];
    var cur_square_units = units_map[cur_square];

    // Maintain list of the current square's peers
    var cur_square_peers = [];

    // Look through the current square's units map...
    for (var sui in cur_square_units) {
      var cur_unit = cur_square_units[sui];

      for (var ui in cur_unit) {
        var cur_unit_square = cur_unit[ui];

        if (
          cur_square_peers.indexOf(cur_unit_square) === -1 &&
          cur_unit_square !== cur_square
        ) {
          cur_square_peers.push(cur_unit_square);
        }
      }
    }

    // Save the current square an its associated peers to the map
    square_peers_map[cur_square] = cur_square_peers;
  }

  return square_peers_map;
};

export const difficultyCounter = (grid) => {
  let count = 0;
  grid.split("").map((cell) => {
    if (cell !== ".") count++;
  });
  return CheckRange(count);
};

export const CheckRange = (count) => {
  const array = Object.keys(DIFFICULTY);
  if (count === 17) {
    return array[5];
  } else if (between(count, 18, 26)) {
    return array[4];
  } else if (between(count, 27, 35)) {
    return array[3];
  } else if (between(count, 36, 44)) {
    return array[2];
  } else if (between(count, 45, 53)) {
    return array[1];
  } else {
    return array[0];
  }
};
export const between = (x, min, max) => {
  return x >= min && x <= max;
};
