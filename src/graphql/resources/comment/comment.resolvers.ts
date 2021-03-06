import { GraphQLResolveInfo } from "graphql";

import { DBConnection }  from '../../../interfaces/DBConnectionInterface'
import { CommentInstance } from '../../../models/CommentModel'
import { Transaction } from "sequelize";

export const commentResolvers = {
    Comment: {
        user: (comment, args, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            return db.User.findById(comment.get('user'));
        },
        post: (comment, args, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            return db.Post.findById(comment.get('post'));
        },
    },
    Query: {
        commentsByPost: (parent, { postId, limit = 10, offset = 0}, { db }: { db: DBConnection}, info: GraphQLResolveInfo) => {
            postId = parseInt(postId);
            return db.Comment.findAll({
                where: {
                    post: postId
                },
                limit, offset
            });
        }
    },
    Mutations: {
        createComment: (parent, {input}, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            return db.sequelize.transaction((t : Transaction) => {
                return db.Comment.create(input, {transaction: t})
            })
        },
        updateComment: (parent, { id, input }, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment.findById(id).then((comment: CommentInstance) => {
                    if (!comment) throw new Error(`Comment with ${id} not found`);
                    return comment.update(input, {transaction: t});
                })
            })
        },
        deleteComment: (parent, { id }, { db }: { db: DBConnection}, info :GraphQLResolveInfo ) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment.findById(id).then((comment: CommentInstance) => {
                    if (!comment) throw new Error(`Comment with ${id} not found`);
                    return comment.destroy({transaction: t})
                        .then(comment => !!comment);
                })
            })
        }   
    }
}