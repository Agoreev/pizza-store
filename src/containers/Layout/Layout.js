import React, { Fragment, useState } from "react";
import { useQuery, useApolloClient } from "react-apollo";
import classes from "./Layout.module.css";
import Toolbar from "../../components/navigation/toolbar";
import SideDrawer from "../../components/navigation/side-drawer";
import { CURRENT_USER_QUERY } from "../../queries";

const Layout = ({ children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };
  const { data } = useQuery(CURRENT_USER_QUERY);
  const client = useApolloClient();

  if (!!data && data.me) {
    client.writeData({
      data: {
        isLoggedIn: true,
      },
    });
  }
  return (
    <Fragment>
      <Toolbar
        isAuthenticated={!!data && data.me}
        sideDrawerOpen={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuthenticated={!!data && data.me}
        closed={sideDrawerToggleHandler}
        open={showSideDrawer}
      />
      <main className={classes.Content}>{children}</main>
    </Fragment>
  );
};

export default Layout;
