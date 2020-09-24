import React, { Fragment } from "react";
import Logo from "../../logo";
import NavigationItems from "../navigation-items";
import classes from "./side-drawer.module.css";
import Backdrop from "../../ui/backdrop";

const SideDrawer = ({ closed, open, isAuthenticated, userName }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Fragment>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        {userName ? (
          <div className={classes.User}>Hello, {userName}!</div>
        ) : null}
        <nav>
          <NavigationItems
            isAuthenticated={isAuthenticated}
            sideDrawerClosed={closed}
          />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
