import React, { Component, Fragment } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import classes from "./Layout.module.css";
import Toolbar from "../../components/navigation/toolbar";
import SideDrawer from "../../components/navigation/side-drawer";

const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`;

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
    const { children } = this.props;
    return (
      <Query query={IS_LOGGED_IN}>
        {({ data }) => {
          return (
            <Fragment>
              <Toolbar
                isAuthenticated={data.isLoggedIn}
                sideDrawerOpen={this.sideDrawerToggleHandler}
              />
              <SideDrawer
                isAuthenticated={data.isLoggedIn}
                closed={this.sideDrawerToggleHandler}
                open={this.state.showSideDrawer}
              />
              <main className={classes.Content}>{children}</main>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Layout;
