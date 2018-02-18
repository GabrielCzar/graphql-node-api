import * as Sequelize  from "sequelize";
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface CommentAttibutes {
    id?: number;
    comment?: string;
    post?: number;
    user?: number;
    createAt?: string;
    updateAt?: string;
}

export interface CommentInstance extends Sequelize.Instance<CommentAttibutes> {}

export interface CommentModel extends BaseModelInterface, Sequelize.Model<CommentInstance, CommentAttibutes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): CommentModel => {
    const Comment : CommentModel = sequelize.define('Comment', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: dataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'comments'
    });

    Comment.associate = (models :ModelsInterface) :void => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false,
                field: 'post',
                name: 'post'
            }
        });
     
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    }

    return Comment;
}