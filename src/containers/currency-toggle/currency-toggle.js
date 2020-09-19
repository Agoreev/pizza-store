import React from "react";
import classes from "./currency-toggle.module.css";
import { gql } from "apollo-boost";
import { useApolloClient, useQuery } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesomee";

export const GET_CURRENCY = gql`
  query currencyQuery {
    currency @client
  }
`;

const CurrencyToggle = () => {
  const client = useApolloClient();
  const onCurrencyChange = (currentCurrency) => {
    client.writeData({
      data: {
        currency: currentCurrency === "$" ? "€" : "$",
      },
    });
  };
  const currentCurrency = useQuery(GET_CURRENCY);
  return (
    <div className={classes.CurrencyToggle}>
      <button
        className="icon-button"
        onClick={() => onCurrencyChange(currentCurrency)}
      >
        <span className={currentCurrency === "$" ? classes.Active : null}>
          $
        </span>
        <FontAwesomeIcon icon="exchange-alt" />
        <span className={currentCurrency === "€" ? classes.Active : null}>
          €
        </span>
      </button>
    </div>
  );
};

export default CurrencyToggle;
