import React from "react";
import classes from "./error-indicator.module.css";
import icon from "../../../assets/images/pizza-error.png";

const ErrorIndicator = () => {
  return (
    <div className={classes.ErrorIndicator}>
      <img src={icon} alt="Error"></img>
      <span className={classes.Boom}>BOOM!</span>
      <span>Something has gone terribly wrong</span>
      <span>But we are already working on it!</span>
    </div>
  );
};

export default ErrorIndicator;
