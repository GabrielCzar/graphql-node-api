import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface'

export interface UserAttributes {
    id? :number;
    name? :string;
    email? :string;
    password? :string;
    photo? :string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes{
    isPassword(encodedPassword :string, password :string) :boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes>{}

export default (sequelize :Sequelize.Sequelize, dataTypes :Sequelize.DataTypes) :UserModel => {
    const user: UserModel = sequelize.define('User', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        photo: {
            type: dataTypes.BLOB({
                length: 'long'
            }),
            allowNull: true
        }
    });
}