'use strict';
// const { uuid , uuidv4 } = require('uuid')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    position: DataTypes.STRING,
    address: DataTypes.STRING,

    firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    companyPhone: DataTypes.STRING,
    mobilePhone: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    dob: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,

    state: DataTypes.STRING,
    companyName: DataTypes.STRING,




  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.beforeCreate(user => user.id = Math.random(8));
  return User;
};