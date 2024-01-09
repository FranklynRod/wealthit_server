'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');


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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for username',
        },
        notNull: {
          msg: 'Please provide a value for username',
        }
      }
    },
    emailAddress: {
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "password"',
          }
        },
        set(val) {
      if (val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue('password', hashedPassword);
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
      Account.hasMany(models.Liability, {
        foreignKey: {
          fieldName: 'accountId',
          allowNull: false,
        },
      });
    };
  return Account;
};