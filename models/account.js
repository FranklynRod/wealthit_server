'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // define association here
    }
  }
  Account.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for user name',
        },
        notNull: {
          msg: 'Please provide a value for username',
        }
      }
    },
    savings: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'The email you entered already exists'
        },
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "email address"',
          },
          isEmail:{
            msg: "Please provide a valid email address"
          }, notEmpty: {
            msg: 'Please provide a value for "email address"',
          }
        }
      },
      homeEquity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "password"',
          }
        },
    
      },
  }, { sequelize });
    
    Account.associate = (models) => {
      Account.hasMany(models.Asset, {
        foreignKey: {
          fieldName: 'accountId',
          allowNull: false,
        },
      });
    };
  return User;
};