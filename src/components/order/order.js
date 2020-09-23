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
        <span className={classes.Count}>{item.count}</span>
        <h3 className={classes.Name}>{item.pizza.name}</h3>

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
      convertedDate.getFullYear() +
      " " +
      ("0" + convertedDate.getHours()).slice(-2) +
      ":" +
      ("0" + convertedDate.getMinutes()).slice(-2)
    : null;
  const address = city + ", " + street + ", " + house;
  return (
    <article className={classes.Order}>
      <header className={classes.Header}>
        <span>{dateString}</span>
        <span>{address}</span>
      </header>
      <main className={classes.OrderItems}>{orderItems}</main>
      <span className={classes.DeliveryCost}>
        Delivery cost:&nbsp;
        <Price currency={currency} price={deliveryCost} rate={rate} />
      </span>
      <footer className={classes.TotalPrice}>
        Total price:&nbsp;
        <Price currency={currency} price={totalPrice} rate={rate} />
      </footer>
    </article>
  );
};

export default Order;
