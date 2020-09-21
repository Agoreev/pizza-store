import React from "react";
import CurrencyToggle from "../CurrencyToggle";
import classes from "./Subheader.module.css";

const Subheader = ({ title, children }) => {
  return (
    <div className={classes.Subheader}>
      <h1 className={classes.Title}>{title}</h1>
      {children}
      <CurrencyToggle />
    </div>
  );
};

export default Subheader;
