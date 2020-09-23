import { gql } from "apollo-boost";

export const ADD_ORDER = gql`
  mutation addOrder($order: OrderInput!) {
    addOrder(order: $order) {
      _id
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($phone: String!, $name: String) {
    signIn(phone: $phone, name: $name) {
      _id
    }
  }
`;

export const SIGN_OUT = gql`
  mutation {
    signOut
  }
`;

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($pizzaId: ID!, $count: Int, $price: Float!) {
    addOrRemoveFromCart(pizzaId: $pizzaId, count: $count, price: $price) @client
  }
`;
