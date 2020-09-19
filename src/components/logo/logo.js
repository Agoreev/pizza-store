import React from "react";
import burgerLogo from "../../assets/images/pizza.png";
import classes from "./logo.module.css";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Logo" />
      <span>PIZZA STORE</span>
    </div>
  );
};

export default Logo;
