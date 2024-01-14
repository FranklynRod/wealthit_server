'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Liability extends Model {

    static associate(models) {
      // define association here
    }
  }
Liability.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please select a date',
        }
      }
    },
    loans: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "description"',
        }
      }
    },
    creditCard: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    homeLoan: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      other: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
  }, {sequelize});

Liability.associate = (models) => {
    Liability.belongsTo(models.Account,{
    foreignKey: {
      fieldName: 'accountId',
      allowNull: false,
    },});
    
    };
  return Liability;
};