import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMinus,
  faTrashAlt,
  faExchangeAlt,
  faShoppingCart,
  faSignInAlt,
  faPizzaSlice,
  faCartPlus,
  faArrowLeft,
  faSignOutAlt,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "./containers/Layout";
import PizzaMenu from "./containers/PizzaMenu";
import SignIn from "./containers/Auth/SignIn";
import SignOut from "./containers/Auth/SignOut";
import Cart from "./containers/Cart";
import Checkout from "./containers/Checkout";
import OrderSuccess from "./containers/OrderSuccess";
import Orders from "./containers/Orders";
import { resolvers, typeDefs } from "./resolvers";

import "./App.css";

library.add(
  faPlus,
  faMinus,
  faTrashAlt,
  faExchangeAlt,
  faShoppingCart,
  faSignInAlt,
  faPizzaSlice,
  faCartPlus,
  faArrowLeft,
  faSignOutAlt,
  faReceipt
);

const cache = new InMemoryCache();
cache.writeData({
  data: {
    isLoggedIn: false,
    cartItems: [],
    currency: "$",
    totalPrice: 0,
    purchased: false,
  },
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  credentials: "include",
  typeDefs,
  resolvers,
  cache,
});

const App = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" component={PizzaMenu} exact />
              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/order-success" component={OrderSuccess} />
              <Route path="/orders" component={Orders} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signout" component={SignOut} />
              <Route render={() => <h2>Page not found</h2>} />
            </Switch>
          </Layout>
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default App;
