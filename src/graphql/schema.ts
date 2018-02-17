import { makeExecutableSchema } from 'graphql-tools'

const users : any [] = [
    {
        id: 1,
        name: 'John',
        email: 'john@mail.com'
    },
    {
        id: 2,
        name: 'Fulano',
        email: 'fulano@mail.com'
    }
]

const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [ User! ]!
    }

    type Mutation {
        createUser(name: String!, email: String!): User
    }
`

const resolvers = {
    // implementando resolvers triviais
    User: {
        id: (parent) => parent.id,
        name: (parent) => parent.name,
        email: (parent) => parent.email
    },
    Query: {
        allUsers: () => users
    },
    Mutation: {
        createUser: (parent, params) => {
            const newUser = Object.assign({ id: users.length + 1}, params)
            users.push(newUser)
            return newUser
        }
    }
}

export default makeExecutableSchema({ typeDefs, resolvers })