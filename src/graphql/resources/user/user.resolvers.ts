import { GraphQLResolveInfo } from "graphql";

import { DBConnection }  from '../../../interfaces/DBConnectionInterface'
import { UserInstance } from '../../../models/UserModel'
import { Transaction } from "sequelize";

export const userResolvers = {
    User: {
        posts: (user: UserInstance, { limit = 10, offset = 0}, { db }: { db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.Post.findAll({
                where: {
                    author: user.get('id')
                },
                limit, offset
            });
        }
    },
    Query: {
        users: (parent, { limit = 10, offset = 0}, { db }: { db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.User.findAll({
                limit, offset
            });
        },
        user: (parent, { id }, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            return db.User.findById(id).then((user: UserInstance) => {
              if (!user) throw new Error(`User with id ${id} not found!`)
              return user;
            })
        }
    },
    Mutations: {
        createUser: (parent, {input}, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            return db.sequelize.transaction((t : Transaction) => {
                return db.User.create(input, {transaction: t})
            })
        },
        updateUser: (parent, { id, input }, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.User.findById(id).then((user: UserInstance) => {
                    if (!user) throw new Error(`User with ${id} not found`);
                    return user.update(input, {transaction: t});
                })
            })
        },
        updateUserPass: (parent, { id, input }, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.User.findById(id).then((user: UserInstance) => {
                    if (!user) throw new Error(`User with ${id} not found`);
                    return user.update(input, {transaction: t})
                        .then((user: UserInstance) => !!user);
                })
            })
        },
        deleteUser: (parent, { id }, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.User.findById(id).then((user: UserInstance) => {
                    if (!user) throw new Error(`User with ${id} not found`);
                    return user.destroy({transaction: t})
                        .then(user => !!user);
                })
            })
        }
    }
}