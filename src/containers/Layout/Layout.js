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
  const { data: userData } = useQuery(CURRENT_USER_QUERY);

  const client = useApolloClient();

  if (!!userData && userData.me) {
    client.writeData({
      data: {
        isLoggedIn: true,
      },
    });
  } else {
    client.writeData({
      data: {
        isLoggedIn: false,
      },
    });
  }
  const userName = !!userData && !!userData.me ? userData.me.name : null;

  return (
    <Fragment>
      <Toolbar
        isAuthenticated={!!userData && userData.me}
        userName={userName}
        sideDrawerOpen={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuthenticated={!!userData && userData.me}
        closed={sideDrawerToggleHandler}
        userName={userName}
        open={showSideDrawer}
      />
      <main className={classes.Content}>{children}</main>
    </Fragment>
  );
};

export default Layout;
