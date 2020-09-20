import React from "react";
import { useMutation } from "react-apollo";
import { GET_PIZZAS } from "../../PizzaMenu";
import { TOGGLE_CART } from "../../../Cart/Cart";
import Price from "../../../../components/price";
import classes from "./pizza-item.module.css";

const PizzaItem = ({ pizza, currency, eurRate }) => {
  const { _id, name, description, img, price, isInCart } = pizza;
  const [toggleCart] = useMutation(TOGGLE_CART, {
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
        <Price currency={currency} price={price} rate={eurRate} />
        <button
          className="button"
          onClick={() =>
            toggleCart({
              variables: {
                pizzaId: _id,
                count: isInCart ? 0 : 1,
                price: price,
              },
            })
          }
        >
          {pizza.isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </footer>
    </article>
  );
};

export default PizzaItem;
