import React from "react";
import classes from "./toolbar.module.css";
import Logo from "../../logo";
import NavigationItems from "../navigation-items";
import DrawerToggle from "../side-drawer/drawer-toggle";

const Toolbar = ({ sideDrawerOpen, isAuthenticated }) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={sideDrawerOpen} />
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuthenticated} />
      </nav>
    </header>
  );
};

export default Toolbar;
