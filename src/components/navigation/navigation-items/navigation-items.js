import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./navigation-items.module.css";
import NavigationItem from "./navigation-item";

const NavigationItems = ({ isAuthenticated }) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">
        <FontAwesomeIcon icon="pizza-slice" />
        &nbsp;PIZZA MENU
      </NavigationItem>
      <NavigationItem link="/cart">
        <FontAwesomeIcon icon="shopping-cart" />
        &nbsp;CART
      </NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link="/orders">ORDERS</NavigationItem>
      ) : null}
      {!isAuthenticated ? (
        <NavigationItem link="/auth">
          <FontAwesomeIcon icon="sign-in-alt" />
          &nbsp;AUTHENTICATE
        </NavigationItem>
      ) : (
        <NavigationItem link="/logout">LOGOUT</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
