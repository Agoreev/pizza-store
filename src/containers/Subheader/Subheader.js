import React from "react";
import CurrencyToggle from "../CurrencyToggle";
import classes from "./Subheader.module.css";

const Subheader = ({ title }) => {
  return (
    <div className={classes.Subheader}>
      <h1 className={classes.Title}>{title}</h1>
      <CurrencyToggle />
    </div>
  );
};

export default Subheader;
