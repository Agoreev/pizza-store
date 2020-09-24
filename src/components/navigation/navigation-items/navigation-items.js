import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./navigation-items.module.css";
import NavigationItem from "./navigation-item";

const NavigationItems = ({ isAuthenticated, sideDrawerClosed }) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" sideDrawerClosed={sideDrawerClosed}>
        <FontAwesomeIcon icon="pizza-slice" />
        &nbsp;PIZZA MENU
      </NavigationItem>
      <NavigationItem link="/cart" sideDrawerClosed={sideDrawerClosed}>
        <FontAwesomeIcon icon="shopping-cart" />
        &nbsp;CART
      </NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link="/orders" sideDrawerClosed={sideDrawerClosed}>
          <FontAwesomeIcon icon="receipt" />
          &nbsp;ORDERS
        </NavigationItem>
      ) : null}
      {!isAuthenticated ? (
        <NavigationItem link="/signin" sideDrawerClosed={sideDrawerClosed}>
          <FontAwesomeIcon icon="sign-in-alt" />
          &nbsp;SIGN IN
        </NavigationItem>
      ) : (
        <NavigationItem link="/signout" sideDrawerClosed={sideDrawerClosed}>
          <FontAwesomeIcon icon="sign-out-alt" />
          &nbsp;SIGN OUT
        </NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
