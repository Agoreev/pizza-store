import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/pizza.png";
import classes from "./logo.module.css";

const Logo = () => {
  return (
    <Link to="/">
      <div className={classes.Logo}>
        <img src={logoImg} alt="Logo" />
        <span>PIZZA STORE</span>
      </div>
    </Link>
  );
};

export default Logo;
