import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { GET_PIZZAS } from "../../PizzaMenu";
import classes from "./pizza-item.module.css";

const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($pizzaId: ID!) {
    addOrRemoveFromCart(pizzaId: $pizzaId) @client
  }
`;

const PizzaItem = ({ pizza, currency, eurRate }) => {
  const { name, description, img, price } = pizza;
  const [toggleCart, { loading, error }] = useMutation(TOGGLE_CART, {
    variables: { pizzaId: pizza._id },
    refetchQueries: [
      {
        query: GET_PIZZAS,
      },
    ],
  });
  return (
    <article className={classes.Pizza}>
      <main>
        <img className={classes.Image} src={img} alt={name} />
        <h2 className={classes.Name}>{name}</h2>
        <p className={classes.Description}>{description}</p>
      </main>
      <footer className={classes.Footer}>
        <span className={classes.Price}>
          {currency === "$" ? price : (price * eurRate).toFixed(2)} {currency}
        </span>
        <button className="button" onClick={() => toggleCart()}>
          {pizza.isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </footer>
    </article>
  );
};

export default PizzaItem;
