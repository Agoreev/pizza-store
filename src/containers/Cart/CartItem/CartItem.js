import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import Price from "../../../components/price";
import CartControls from "../../../components/cart-controls";
import SmallSpinner from "../../../components/ui/small-spinner";
import ErrorIndicator from "../../../components/ui/error-indicator";
import classes from "./Cart-item.module.css";

const GET_PIZZA_BY_ID = gql`
  query GetPizzaById($pizzaId: ID!) {
    pizza(pizzaId: $pizzaId) {
      _id
      name
      description
      img
      price
    }
  }
`;

const CartItem = ({ item, toggleCart, currency, rate, withoutControls }) => {
  const { data, loading, error } = useQuery(GET_PIZZA_BY_ID, {
    variables: { pizzaId: item.pizzaId },
  });

  if (loading) return <SmallSpinner />;
  if (error) return <ErrorIndicator />;
  const { pizza } = data;

  return (
    <article className={classes.CartItem}>
      <img src={pizza.img} className={classes.Img} alt={pizza.name} />

      {withoutControls ? (
        <Fragment>
          <span className={classes.Count}>{item.count}</span>
          <h3 className={classes.Name}>{pizza.name}</h3>
        </Fragment>
      ) : (
        <Fragment>
          <h3 className={classes.Name}>{pizza.name}</h3>
          <CartControls
            pizzaId={pizza._id}
            count={item.count}
            price={item.price}
            toggleCart={toggleCart}
            showRemoveIcon={true}
          />
        </Fragment>
      )}

      <div className={classes.Price}>
        <Price
          currency={currency}
          price={pizza.price * item.count}
          rate={rate}
        />
      </div>
    </article>
  );
};

export default CartItem;
