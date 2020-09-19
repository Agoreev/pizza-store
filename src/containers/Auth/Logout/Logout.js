import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useApolloClient } from "react-apollo";
import Cookies from "js-cookie";

const Logout = () => {
  const client = useApolloClient();
  useEffect(() => {
    client.writeData({ data: { isLoggedIn: false } });
    Cookies.remove("token");
  });

  return <Redirect to="/" />;
};

export default Logout;
