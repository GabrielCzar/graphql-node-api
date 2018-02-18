import { GraphQLResolveInfo } from "graphql";

import { DBConnection }  from '../../../interfaces/DBConnectionInterface'
import { PostInstance } from '../../../models/PostModel'
import { Transaction } from "sequelize";

export const postResolvers = {
    Post: {
        author: (post, args, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            return db.User.findById(post.get('author'));
        },
        comments: (post, { limit = 10, offset = 0}, { db }: { db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.Comment.findAll({
                where: {
                    post: post.get('id')
                },
                limit, offset
            });
        }
    },
    Query: {
        posts: (parent, { limit = 10, offset = 0}, { db }: { db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.Post.findAll({
                limit, offset
            });
        },
        post: (parent, { id }, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            id = parseInt(id);
            return db.Post.findById(id).then((post: PostInstance) => {
              if (!post) throw new Error(`User with id ${id} not found!`)
              return post;
            })
        }
    },
    Mutations: {
        createPost: (parent, {input}, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            return db.sequelize.transaction((t : Transaction) => {
                return db.Post.create(input, {transaction: t})
            })
        },
        updatePost: (parent, { id, input }, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post.findById(id).then((post: PostInstance) => {
                    if (!post) throw new Error(`Post with ${id} not found`);
                    return post.update(input, {transaction: t});
                })
            })
        },
        deletePost: (parent, { id }, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post.findById(id).then((post: PostInstance) => {
                    if (!post) throw new Error(`Post with ${id} not found`);
                    return post.destroy({transaction: t})
                        .then(post => !!post);
                })
            })
        }   
    }
}