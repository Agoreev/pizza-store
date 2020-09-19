import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import { Link } from "react-router-dom";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const GET_PIZZA_BY_IDS = gql`
  query {
    pizzaByIds {
      _id
      name
      description
      img
      price
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query {
    cartItems @client
  }
`;

const Cart = () => {
  const { data, loading, error } = useQuery(GET_CART_ITEMS);

  if (loading) return <Spinner />;
  if (error) return <ErrorIndicator />;

  return (
    <div className={classes.Cart}>
      <h1>Your cart</h1>
      {!data || (!!data && data.cartItems.length === 0) ? (
        <Fragment>
          <p>No pizza in your cart yet</p>
          <Link to="/">Go to menu</Link>
        </Fragment>
      ) : (
        !!data &&
        data.cartItems.map((pizzaId) => (
          <CartItem key={pizzaId} pizzaId={pizzaId} />
        ))
      )}
    </div>
  );
};

export default Cart;
