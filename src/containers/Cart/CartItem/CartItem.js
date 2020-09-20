import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import Price from "../../../components/price";
import CartControls from "../../../components/cart-controls";
import Spinner from "../../../components/ui/spinner";
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

const CartItem = ({ item, toggleCart, currency, rate }) => {
  const { data, loading, error } = useQuery(GET_PIZZA_BY_ID, {
    variables: { pizzaId: item.pizzaId },
  });

  if (loading) return <Spinner />;
  if (error) return <ErrorIndicator />;
  const { pizza } = data;

  return (
    <article className={classes.CartItem}>
      <img src={pizza.img} className={classes.Img} alt={pizza.name} />
      <h3 className={classes.Name}>{pizza.name}</h3>

      <CartControls
        pizzaId={pizza._id}
        count={item.count}
        price={item.price}
        toggleCart={toggleCart}
      />
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
