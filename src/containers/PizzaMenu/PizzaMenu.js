import React from "react";
import { useQuery } from "react-apollo";
import { GET_PIZZAS, GET_CART_ITEMS } from "../../queries";
import Helmet from "react-helmet";
import PizzaList from "./pizza-list";
import Subheader from "../Subheader";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
import CartButton from "../../components/cart-button";
import classes from "./PizzaMenu.module.css";

const PizzaMenu = () => {
  const { loading, data, error } = useQuery(GET_PIZZAS);
  const { data: cartData, loading: cartLoading, error: cartError } = useQuery(
    GET_CART_ITEMS
  );

  if (loading || cartLoading) return <Spinner />;
  if (error || cartError) return <ErrorIndicator />;
  const cartButton =
    cartData.cartItems && cartData.cartItems.length ? (
      <CartButton
        itemsCount={cartData.cartItems.reduce(
          (sum, item) => sum + item.count,
          0
        )}
      />
    ) : null;
  return (
    <section className={classes.PizzaMenu}>
      <Helmet>
        <title>Pizza store | Menu</title>
      </Helmet>
      <Subheader title="Pizza menu">{cartButton}</Subheader>
      <PizzaList
        data={data}
        currency={cartData.currency}
        eurRate={cartData.EURRate}
        cartItems={cartData.cartItems}
      />
    </section>
  );
};

export default PizzaMenu;
