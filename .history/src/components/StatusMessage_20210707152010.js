import React from "react";
import { STATUS } from "../services/Constants";
import {
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

const StatusMessage = ({ status, timeElapsed }) => {
  switch (status) {
    case STATUS.VALID: {
      return (
        <div className="flex items-center justify-center">
          <CheckCircleIcon className="w-5 h-5 mr-3 text-green-500" />
          <h5>This Board is Valid</h5>
        </div>
      );
    }
    case STATUS.DIFFICULTY: {
      return (
        <div className="flex items-center justify-center">
          <CheckCircleIcon className="w-5 h-5 mr-3 text-green-500" />
          <h5 className="font-semibold capitalize">{timeElapsed}</h5>
        </div>
      );
    }
    case STATUS.INVALID: {
      return (
        <div className="flex items-center justify-center">
          <XCircleIcon className="w-5 h-5 mr-3 text-red-500" />
          <h5>This Board is unsolved</h5>
        </div>
      );
    }
    case STATUS.ABORT: {
      return (
        <div className="flex items-center justify-center">
          <BellIcon className="w-5 h-5 mr-3 text-red-500" />
          <h4>
            The processing is taking more time than expected and maybe cannot be
            solved with the current version. Please try another board.
          </h4>
        </div>
      );
    }
    case STATUS.TIMER: {
      return (
        <div className="flex items-center justify-center">
          <ClockIcon className="w-5 h-5 mr-3 text-green-500" />
          <h5>Time elapsed: {timeElapsed} ms</h5>
        </div>
      );
    }
    case STATUS.SOLVE: {
      return (
        <div>
          <div className="flex items-center justify-center">
            <CheckCircleIcon className="w-5 h-5 mr-3 text-green-500" />
            <h5>This Board is Valid</h5>
          </div>
          <div className="flex items-center justify-center">
            <InformationCircleIcon className="w-5 h-5 mr-3 text-green-500" />
            <h4 className="text-green-400">
              After parsing the initial board and looking for possible values
              for every cell, the puzzle is solved. So, there's not too much to
              do here.
            </h4>
          </div>
        </div>
      );
    }
    default: {
      return <></>;
    }
  }
};

export default StatusMessage;
