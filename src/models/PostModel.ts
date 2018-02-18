import * as Sequelize  from "sequelize";
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface PostAttibutes {
    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: number;
    createAt?: string;
    updateAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttibutes> {}

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAttibutes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): PostModel => {
    const Post : PostModel = sequelize.define('Post', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        content: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: dataTypes.BLOB({
                length: 'long'
            }),
            allowNull: false
        }
    }, {
        tableName: 'posts'
    });

    Post.associate = (models :ModelsInterface) :void => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        });
    }

    return Post;
}