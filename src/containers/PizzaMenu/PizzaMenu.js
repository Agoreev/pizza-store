import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import PizzaList from "./pizza-list";
import Subheader from "../Subheader";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
import CartButton from "../../components/cart-button";
import classes from "./PizzaMenu.module.css";

export const GET_PIZZAS = gql`
  query {
    pizzas {
      _id
      name
      description
      img
      price
      isInCart @client
    }
    currency @client
    cartItems @client
    EURRate
  }
`;

const PizzaMenu = () => {
  const { loading, data, error } = useQuery(GET_PIZZAS);

  if (loading) return <Spinner />;
  if (error) return <ErrorIndicator />;
  const cartButton =
    data.cartItems && data.cartItems.length ? (
      <CartButton
        itemsCount={data.cartItems.reduce((sum, item) => sum + item.count, 0)}
      />
    ) : null;
  return (
    <section className={classes.PizzaMenu}>
      <Subheader title="Pizza menu">{cartButton}</Subheader>
      <PizzaList
        data={data}
        currency={data.currency}
        eurRate={data.EURRate}
        cartItems={data.cartItems}
      />

      <button className="btn btn-success">Order now</button>
    </section>
  );
};

export default PizzaMenu;
