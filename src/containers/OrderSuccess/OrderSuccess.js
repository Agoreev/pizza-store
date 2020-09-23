import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo";
import { Redirect } from "react-router-dom";
import { IS_LOGGED_IN } from "../../queries";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
import icon from "../../assets/images/delivery.png";
import classes from "./OrderSuccess.module.css";

const OrderSuccess = () => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);
  if (loading) return <Spinner />;
  if (error) return <ErrorIndicator />;

  const authRedirect = !data.isLoggedIn ? <Redirect to="/" /> : null;
  return (
    <article className={classes.OrderSuccess}>
      {authRedirect}
      <header>
        <h1>We hope you enjoy our pizza!</h1>
      </header>
      <main>
        <img src={icon} alt="delivery" />
      </main>
      <footer>
        <Link to="/" className="button">
          PIZZA MENU
        </Link>
        <Link to="/orders" className="button">
          ORDERS
        </Link>
      </footer>
    </article>
  );
};

export default OrderSuccess;
