import React, { Component, Fragment } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/navigation/toolbar";
import SideDrawer from "../../components/navigation/side-drawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState((state) => {
      return { showSideDrawer: !state.showSideDrawer };
    });
  };
  render() {
    const { isAuthenticated, children } = this.props;
    return (
      <Fragment>
        <Toolbar
          isAuthenticated={isAuthenticated}
          sideDrawerOpen={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={isAuthenticated}
          closed={this.sideDrawerToggleHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.content}>{children}</main>
      </Fragment>
    );
  }
}

export default Layout;
