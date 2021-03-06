const userTypes = `
    # User definition type
    type User {
        id: ID!
        name: String!
        email: String!
        photo: String
        createAt: String!
        updateAt: String!  
        posts(limit: Int, offset: Int): [ Post! ]!
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
`

const userQueries = `
    users(limit: Int, offset: Int): [ User! ]!
    user(id: ID!): User
`

const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(id: ID!, input: UserUpdateInput!): User
    updateUserPass(id: ID!, input: UserUpdatePassInput!): Boolean
    deleteUser(id: ID!): Boolean
`

export {
    userTypes,
    userQueries,
    userMutations
}