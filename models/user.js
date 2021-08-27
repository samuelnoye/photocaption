'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const jwt = require('jsonwebtoken');

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, must be unique
 *          password:
 *            type: string
 *            description: Must be between 8 and 20 characters
 *        example:
 *           name: Test User
 *           email: testuser@test.com
 *           password: p@ssw0rd
 */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Caption, {
        foreignKey: 'user_id',
        as: 'captions'
      })
    }

    generateToken() {
      return jwt.sign({
          id: this.id,
          email: this.email
        },
        config.privateKey);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      len: [8,20]
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  return User;
};
