import { STRATEGIES } from "./Constants";

let solverStrategy = "";

export const setSolverStrategy = (strategy) => {
  // eslint-disable-next-line no-unused-vars
  solverStrategy = strategy;
};

const logs = {
  solutionSteps: [],
  timeElapsedLog: [],
  gamesBoardLog: [],
};

export const addSolutionStepsLog = (strategy, keys, value, method, msg) => {
  if (solverStrategy !== STRATEGIES.BACKTRACKING) {
    logs.solutionSteps.push({
      strategy: strategy,
      date: new Date().toLocaleString(),
      keys: [...keys],
      value: value,
      method: method,
      msg: msg,
    });
  }
};

export const startTimer = () => {
  return Date.now();
};

export const stopTimer = (startTimer) => {
  return Date.now() - startTimer;
};
