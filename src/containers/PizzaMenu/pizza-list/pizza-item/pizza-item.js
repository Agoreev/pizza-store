import React from "react";
import { useMutation } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GET_PIZZAS } from "../../PizzaMenu";
import { TOGGLE_CART } from "../../../Cart/Cart";
import Price from "../../../../components/price";
import CartControls from "../../../../components/cart-controls";
import classes from "./pizza-item.module.css";

const PizzaItem = ({ pizza, currency, eurRate, cartItem }) => {
  const { _id, name, description, img, price, isInCart } = pizza;
  const [toggleCart] = useMutation(TOGGLE_CART, {
    refetchQueries: [
      {
        query: GET_PIZZAS,
      },
    ],
  });

  const controls = isInCart ? (
    <CartControls
      count={cartItem ? cartItem.count : 0}
      toggleCart={toggleCart}
      pizzaId={_id}
      price={price}
      showRemoveIcon={false}
    />
  ) : (
    <button
      className="button"
      onClick={() =>
        toggleCart({
          variables: {
            pizzaId: _id,
            count: 1,
            price: price,
          },
        })
      }
    >
      <FontAwesomeIcon icon="cart-plus" /> Add to Cart
    </button>
  );
  return (
    <article className={classes.Pizza}>
      <main>
        <img className={classes.Image} src={img} alt={name} />
        <h2 className={classes.Name}>{name}</h2>
        <p className={classes.Description}>{description}</p>
      </main>
      <footer className={classes.Footer}>
        <Price currency={currency} price={price} rate={eurRate} />
        {controls}
      </footer>
    </article>
  );
};

export default PizzaItem;
