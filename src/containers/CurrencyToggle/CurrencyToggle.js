import React from "react";
import { gql } from "apollo-boost";
import { useApolloClient } from "react-apollo";
import classes from "./CurrencyToggle.module.css";

const CurrencyToggle = () => {
  const client = useApolloClient();
  const { currency } = client.readQuery({
    query: gql`
      query {
        currency
      }
    `,
  });
  const onCurrencyChange = (currentCurrency) => {
    client.writeData({
      data: {
        currency: currentCurrency === "$" ? "€" : "$",
      },
    });
  };

  return (
    <div className={classes.CurrencyToggle}>
      <button
        className={"button " + classes.ToggleButton}
        onClick={() => onCurrencyChange(currency)}
      >
        Change currency to
        <span className={classes.CurrencySign}>
          {currency === "$" ? "€" : "$"}
        </span>
      </button>
    </div>
  );
};

export default CurrencyToggle;
