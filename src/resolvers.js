import { gql } from "apollo-boost";

export const typeDefs = gql`
  extend type Query {
    isLooggedIn: Boolean!
    cartItems: [CartItem!]!
    totalPrice: Float!
    currency: String!
    purchased: Boolean!
  }

  type CartItem {
    pizzaId: ID!
    count: Int!
  }

  extend type Mutation {
    addOrRemoveFromCart(pizzaId: ID!): ID
  }
`;

const GET_CART_ITEMS = gql`
  query {
    cartItems @client
    totalPrice @client
  }
`;

const GET_DELIVERY_COST = gql`
  query {
    deliveryCost
  }
`;

export const resolvers = {
  Mutation: {
    addOrRemoveFromCart: (_, { pizzaId, count, price }, { cache }) => {
      const queryResult = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      if (queryResult) {
        const { cartItems } = queryResult;
        const deliveryCostQuery = cache.readQuery({
          query: GET_DELIVERY_COST,
        });
        const deliveryCost = deliveryCostQuery
          ? deliveryCostQuery.deliveryCost
          : 2;

        let newCartItems = null;
        if (count <= 0) {
          newCartItems = cartItems.filter((item) => item.pizzaId !== pizzaId);
        } else {
          const itemIdx = cartItems.findIndex(
            (item) => item.pizzaId === pizzaId
          );
          if (itemIdx !== -1) {
            const newItem = { pizzaId, count, price };
            newCartItems = [
              ...cartItems.slice(0, itemIdx),
              newItem,
              ...cartItems.slice(itemIdx + 1),
            ];
          } else {
            const newItem = { pizzaId, count, price };
            newCartItems = [...cartItems, newItem];
          }
        }

        const totalPrice = newCartItems.reduce((sum, item) => {
          return sum + item.price * item.count;
        }, deliveryCost);

        const data = {
          cartItems: newCartItems,
          totalPrice: parseFloat(totalPrice.toFixed(2)),
        };

        cache.writeQuery({ query: GET_CART_ITEMS, data });
        return data.cartItems;
      }
    },
  },
};
