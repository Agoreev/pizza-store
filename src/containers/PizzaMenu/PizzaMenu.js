import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import PizzaList from "../../components/pizza-list";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
import classes from "./PizzaMenu.module.css";

const GET_PIZZAS = gql`
  query {
    pizzas {
      _id
      name
      description
      img
      price
    }
  }
`;

const PizzaMenu = () => (
  <Query query={GET_PIZZAS}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return <ErrorIndicator />;

      return (
        <div className={classes.PizzaMenu}>
          <PizzaList data={data} />
          {/* TODO: if any pizza in cart show order button */}
          <button className="btn btn-success">Order now</button>
        </div>
      );
    }}
  </Query>
);

export default PizzaMenu;
