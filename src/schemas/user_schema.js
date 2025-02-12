const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    username: String!
    email: String!
  }

  type Token {
    token: String!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!
    login(username: String!, password: String!): Token!
  }
`;
