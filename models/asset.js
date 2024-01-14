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
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for date',
        }
      }
    },
    savings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for saving',
        }
      }
    },
    homeEquity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      investments: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      other: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
  }, {sequelize});

Asset.associate = (models) => {
    Asset.belongsTo(models.Account,{
    foreignKey: {
      fieldName: 'id',
      allowNull: false,
    },});
    
    };
  return Asset;
};