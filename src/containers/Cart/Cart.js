import React, { Fragment } from "react";
import { useQuery, useMutation } from "react-apollo";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Price from "../../components/price";
import { GET_PIZZAS, GET_CART_ITEMS } from "../../queries";
import { TOGGLE_CART } from "../../mutations";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
import CartItem from "./CartItem";
import Subheader from "../Subheader";
import classes from "./Cart.module.css";

const Cart = () => {
  const { data, loading, error } = useQuery(GET_CART_ITEMS);

  const [toggleCart] = useMutation(TOGGLE_CART, {
    refetchQueries: [
      {
        query: GET_PIZZAS,
      },
    ],
  });

  if (loading) return <Spinner />;
  if (error) return <ErrorIndicator />;
  const { cartItems, totalPrice, currency, EURRate, deliveryCost } = data;

  return (
    <section className={classes.Cart}>
      <Helmet>
        <title>Pizza store | Cart</title>
      </Helmet>
      <Link to="/" className={classes.PizzaMenuLink}>
        <FontAwesomeIcon icon="arrow-left" />
        &nbsp;Pizza menu&nbsp;
        <FontAwesomeIcon icon="pizza-slice" />
      </Link>
      <Subheader title="Your cart" />
      {cartItems.length === 0 ? (
        <Fragment>
          <p className={classes.NoItemsText}>No pizza in your cart yet</p>
          <Link className="button" to="/">
            Go to menu
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          {cartItems.map((item) => (
            <CartItem
              key={item.pizzaId}
              item={item}
              toggleCart={toggleCart}
              currency={currency}
              rate={EURRate}
            />
          ))}
          <span className={classes.DeliveryCost}>
            Delivery cost:&nbsp;
            <Price currency={currency} price={deliveryCost} rate={EURRate} />
          </span>
          <h3 className={classes.TotalPrice}>
            Total price:&nbsp;
            <Price currency={currency} price={totalPrice} rate={EURRate} />
          </h3>
          <footer className={classes.Footer}>
            <Link className="button" to="/checkout">
              ORDER NOW
            </Link>
          </footer>
        </Fragment>
      )}
    </section>
  );
};

export default Cart;
