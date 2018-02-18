"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userTypes = `
    # User definition type
    type User {
        id: ID!
        name: String!
        email: String!
        photo: String
        createAt: String!
        updateAt: String!
    }

    input UserCreateInput {
        name: String!
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String!
        email: String!
        photo: String!   
    }

    input UserUpdatePassInput {
        password: String!
    }
`;
exports.userTypes = userTypes;
const userQueries = `
    users(limit: Int, offset: Int): [ User! ]!

    user(id: ID!): User
`;
exports.userQueries = userQueries;
const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(id: ID!, input: UserUpdateInput!): User
    updateUserPass(id: ID!, input: UserUpdatePassInput!): Boolean
    deleteUser(id: ID!): Boolean
`;
exports.userMutations = userMutations;
