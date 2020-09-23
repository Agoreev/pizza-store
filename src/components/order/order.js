import React from "react";
import Price from "../price";
import classes from "./order.module.css";

const Order = ({ order }) => {
  const {
    city,
    street,
    house,
    currency,
    rate,
    totalPrice,
    items,
    date,
    deliveryCost,
  } = order;

  const orderItems = items.map((item) => {
    return (
      <div className={classes.OrderItem} key={item.pizza._id}>
        <img
          src={item.pizza.img}
          className={classes.Img}
          alt={item.pizza.name}
        />
        <h3 className={classes.Name}>{item.pizza.name}</h3>
        <span className={classes.Count}>Count:&nbsp;{item.count}</span>
        <div className={classes.Price}>
          <Price
            currency={currency}
            price={item.price * item.count}
            rate={rate}
          />
        </div>
      </div>
    );
  });
  const convertedDate = new Date(+date);

  const dateString = convertedDate
    ? ("0" + convertedDate.getDay()).slice(-2) +
      "." +
      ("0" + (convertedDate.getMonth() + 1)).slice(-2) +
      "." +
      convertedDate.getFullYear()
    : null;
  const address = city + ", " + street + ", " + house;
  return (
    <article className={classes.Order}>
      <header className={classes.Address}>
        {dateString}&nbsp;{address}
      </header>
      <main className={classes.OrderItems}>{orderItems}</main>
      <span className={classes.DeliveryCost}>
        Delivery cost:&nbsp;
        <Price currency={currency} price={deliveryCost} rate={rate} />
      </span>
      <footer className={classes.TotalPrice}>
        Total price:&nbsp;{totalPrice}
      </footer>
    </article>
  );
};

export default Order;
