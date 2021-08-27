'use strict';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Photo:
 *        type: object
 *        required:
 *          - name
 *          - url
 *        properties:
 *          name:
 *            type: string
 *          url:
 *            type: string
 *            description: path to image file
 *          citation:
 *            type: string
 *            description: citation for image source
 *        example:
 *           name: Sample Photo
 *           path: /images/sample.jpg
 *           citation: by Test Photographer
 */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.hasMany(models.Caption, {
        foreignKey: 'photo_id',
        as: 'captions'
      })
    }
  }
  Photo.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    citation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};
