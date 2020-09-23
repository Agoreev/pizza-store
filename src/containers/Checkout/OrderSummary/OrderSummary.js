import React from "react";
import CartItem from "../../Cart/CartItem";
import Price from "../../../components/price";
import classes from "./OrderSummary.module.css";

const OrderSummary = ({
  cartItems,
  currency,
  totalPrice,
  rate,
  deliveryCost,
}) => {
  const itemsList = cartItems.map((item) => {
    return (
      <CartItem
        key={item.pizzaId}
        withoutControls
        item={item}
        currency={currency}
        rate={rate}
      />
    );
  });
  return (
    <div className={classes.OrderSummary}>
      <div className={classes.ItemsList}>{itemsList}</div>
      <span className={classes.DeliveryCost}>
        Delivery cost:&nbsp;
        <Price currency={currency} price={deliveryCost} rate={rate} />
      </span>
      <h3 className={classes.TotalPrice}>
        Total price:&nbsp;
        <Price currency={currency} price={totalPrice} rate={rate} />
      </h3>
    </div>
  );
};

export default OrderSummary;
