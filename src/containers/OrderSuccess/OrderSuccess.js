import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo";
import { Redirect } from "react-router-dom";
import { IS_PURCHASED } from "../../queries";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
import icon from "../../assets/images/delivery.png";
import classes from "./OrderSuccess.module.css";

const OrderSuccess = () => {
  const { data, loading, error } = useQuery(IS_PURCHASED);
  if (loading) return <Spinner />;
  if (error) return <ErrorIndicator />;

  const notPurchasedRedirect = !data.purchased ? <Redirect to="/" /> : null;
  return (
    <article className={classes.OrderSuccess}>
      {notPurchasedRedirect}
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
