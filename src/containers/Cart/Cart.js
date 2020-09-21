import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo";
import { Link } from "react-router-dom";
import Price from "../../components/price";
import { GET_PIZZAS } from "../PizzaMenu/PizzaMenu";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
import CartItem from "./CartItem";
import Subheader from "../Subheader";
import classes from "./Cart.module.css";

export const GET_CART_ITEMS = gql`
  query {
    cartItems @client
    currency @client
    totalPrice @client
    EURRate
  }
`;

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($pizzaId: ID!, $count: Int, $price: Float!) {
    addOrRemoveFromCart(pizzaId: $pizzaId, count: $count, price: $price) @client
  }
`;

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

  return (
    <section className={classes.Cart}>
      <Subheader title="Your cart" />
      {!data || (!!data && data.cartItems.length === 0) ? (
        <Fragment>
          <p className={classes.NoItemsText}>No pizza in your cart yet</p>
          <Link className="button" to="/">
            Go to menu
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          {!!data &&
            data.cartItems.map((item) => (
              <CartItem
                key={item.pizzaId}
                item={item}
                toggleCart={toggleCart}
                currency={data.currency}
                rate={data.EURRate}
              />
            ))}
          <h3 className={classes.TotalPrice}>
            Total price:&nbsp;
            <Price
              currency={data.currency}
              price={data.totalPrice}
              rate={data.EURRate}
            />
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
