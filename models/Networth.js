'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Networth extends Model {

    static associate(models) {
      // define association here
    }
  }
Networth.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
      },

  }, {sequelize});

Networth.associate = (models) => {
   Networth.belongsTo(models.Account,{
    foreignKey: {
      fieldName: 'accountId',
      allowNull: false,
    },});
    
    };
  return Networth;
};