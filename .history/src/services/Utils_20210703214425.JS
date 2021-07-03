import { rows, cols } from "./Constants";

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
