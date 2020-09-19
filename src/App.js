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
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Layout from "./containers/Layout";
import PizzaMenu from "./containers/PizzaMenu";
import Logout from "./containers/Auth/Logout";
import { resolvers, typeDefs } from "./resolvers";
import "./App.css";

library.add(faPlus, faMinus, faTrashAlt, faExchangeAlt);

const cache = new InMemoryCache();
cache.writeData({
  data: {
    isLoggedIn: !!Cookies.get("token"),
    cartItems: [],
    currency: "$",
  },
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
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
              <Route path="cart" />
              <Route path="/orders" />
              <Route path="/auth" />
              <Route path="/logout" component={Logout} />
              <Route render={() => <h2>Page not found</h2>} />
            </Switch>
          </Layout>
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default App;
