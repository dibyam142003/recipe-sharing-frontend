const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        token: String
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
    }
        type Recipe {
        id: ID!
        title: String!
        ingredients: [String!]!
        instructions: String!
        category: String!
        createdBy: User!
        reviews: [Review!]
    }

    type Subscription {
        recipeAdded: Recipe
        reviewAdded(recipeId: ID!): Review
    }
`;

module.exports = typeDefs;


