import React, { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";
import { useSpring, animated } from "react-spring";
import "../App.css";

const Button = ({ isSpinning, classes, click, label }) => {
  /* showSpinner is used to stay in the "isSpinning state" a bit longer 
    to avoid loading flashes if the loading state is too short. */
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      setShowSpinner(true);
    }

    // Show loader a bits longer to avoid loading flash
    if (!isSpinning && showSpinner) {
      const timeout = setTimeout(() => {
        setShowSpinner(false);
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isSpinning, showSpinner]);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [classes]);

  const fadeOutProps = useSpring({ opacity: showSpinner ? 1 : 0 });
  const fadeInProps = useSpring({ opacity: showSpinner ? 0 : 1 });

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      ref={ref}
      style={
        showSpinner
          ? {
              width: `${width}px`,
              height: `${height}px`,
            }
          : {}
      }
      onClick={click}
      className={classes}
    >
      {showSpinner ? (
        <animated.div style={fadeOutProps}>
          <Spinner />
        </animated.div>
      ) : (
        <animated.div style={fadeInProps}>{label}</animated.div>
      )}
    </a>
  );
};

export default Button;
