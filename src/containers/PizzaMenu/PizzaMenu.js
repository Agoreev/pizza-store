import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import PizzaList from "./pizza-list";
import CurrencyToggle from "../Currency-toggle";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
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
    EURRate
  }
`;

const PizzaMenu = () => {
  const { loading, data, error } = useQuery(GET_PIZZAS);
  if (loading) return <Spinner />;
  if (error) return <ErrorIndicator />;

  return (
    <div className={classes.PizzaMenu}>
      <div className={classes.MenuToolbar}>
        <CurrencyToggle currentCurrency={data.currency} />
      </div>
      <PizzaList data={data} currency={data.currency} eurRate={data.EURRate} />
      {/* TODO: if any pizza in cart show order button */}
      <button className="btn btn-success">Order now</button>
    </div>
  );
};

export default PizzaMenu;
