import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "react-apollo";
import Spinner from "../../../components/ui/spinner";
import { SIGN_OUT } from "../../../mutations";
import { CURRENT_USER_QUERY } from "../../../queries";

const SignOut = () => {
  const [signOut, { loading }] = useMutation(SIGN_OUT);

  useEffect(() => {
    signOut({
      update(cache) {
        cache.writeData({
          data: {
            isLoggedIn: false,
          },
        });
      },
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY,
        },
      ],
    });
  });

  if (loading) return <Spinner />;

  return <Redirect to="/" />;
};

export default SignOut;
