import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Layout from "./containers/Layout";
import PizzaMenu from "./containers/PizzaMenu";
import "./App.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
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
              <Route path="/logout" />
              <Route render={() => <h2>Page not found</h2>} />
            </Switch>
          </Layout>
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default App;
