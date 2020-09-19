import { gql } from "apollo-boost";
import { GET_CART_ITEMS } from "./containers/Cart";

export const typeDefs = gql`
  extend type Query {
    isLooggedIn: Boolean!
    cartItems: [ID!]!
    currency: String!
  }

  extend type Pizza {
    isInCart: Boolean!
  }

  extend type Mutation {
    addorRemoveFromCart(id: ID!): ID
  }
`;

export const resolvers = {
  Pizza: {
    isInCart: (pizza, _, { cache }) => {
      const queryResult = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      if (queryResult) {
        return queryResult.cartItems.includes(pizza._id);
      }
      return false;
    },
  },

  Mutation: {
    addorRemoveFromCart: (_, { pizzaId }, { cache }) => {
      const queryResult = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      if (queryResult) {
        const { cartItems } = queryResult;

        const data = {
          cartItems: cartItems.includes(pizzaId)
            ? cartItems.filter((item) => item !== pizzaId)
            : [...cartItems, pizzaId],
        };
        cache.writeQuery({ query: GET_CART_ITEMS, data });
        return data.cartItems;
      }
    },
  },
};
