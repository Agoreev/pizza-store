import React from "react";
import { useQuery } from "react-apollo";
import Helmet from "react-helmet";
import { GET_ORDERS } from "../../queries";
import Order from "../../components/order";
import Spinner from "../../components/ui/spinner";
import ErrorIndicator from "../../components/ui/error-indicator";
import classes from "./Orders.module.css";

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);
  if (loading) return <Spinner />;
  if (error) return <ErrorIndicator />;
  const ordersList = data.orders.map((order) => {
    return <Order order={order} key={order._id} />;
  });

  return (
    <section className={classes.Orders}>
      <Helmet>
        <title>Pizza store | Orders</title>
        <meta property="og:title" content="Pizza store | Orders" />
      </Helmet>
      {ordersList}
    </section>
  );
};

export default Orders;
