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
