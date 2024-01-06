'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {

    static associate(models) {
      // define association here
    }
  }
Asset.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "title"',
        },
        notEmpty: {
          msg: 'Please provide a value for "title"',
        }
      }
    },
    savings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "description"',
        },
        notEmpty: {
          msg: 'Please provide a value for "description"',
        }
      }
    },
    homeEquity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      investments: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     
  }, {sequelize});

Asset.associate = (models) => {
    Asset.belongsTo(models.Account,{
    foreignKey: {
      fieldName: 'accountId',
      allowNull: false,
    },});
    
    };
  return Asset;
};