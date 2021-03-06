import { gql } from "apollo-boost";

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      _id
      phone
      name
    }
  }
`;

export const GET_PIZZAS = gql`
  query {
    pizzas {
      _id
      name
      description
      img
      price
    }
  }
`;

export const IS_PURCHASED = gql`
  query {
    purchased @client
  }
`;

export const GET_CART_ITEMS = gql`
  query {
    isLoggedIn @client
    cartItems @client
    totalPrice @client
    currency @client
    EURRate
    deliveryCost
  }
`;

export const GET_ORDERS = gql`
  query orders {
    orders {
      _id
      city
      date
      street
      house
      currency
      rate
      totalPrice
      deliveryCost
      items {
        pizza {
          _id
          name
          description
          img
        }
        price
        count
      }
    }
  }
`;
