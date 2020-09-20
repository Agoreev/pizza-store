import React from "react";
import classes from "./Currency-toggle.module.css";
import { useApolloClient } from "react-apollo";

const CurrencyToggle = ({ currentCurrency }) => {
  const client = useApolloClient();
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
        onClick={() => onCurrencyChange(currentCurrency)}
      >
        Change currency to
        <span className={classes.CurrencySign}>
          {currentCurrency === "$" ? "€" : "$"}
        </span>
      </button>
    </div>
  );
};

export default CurrencyToggle;
