const express = require('express');
const router = express.Router();
const swagger = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Caption Contest",
      version: "1.0.0",
      description:
        "Simple backend API to allow users to add captions to photos",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      }
    }
  },
  apis: [
    './models/photo.js',
    './models/user.js',
    './models/caption.js',
    './routes/index.js',
    './routes/users.js',
    './routes/photos.js',
    './routes/captions.js'
  ]
};
const specs = swagger(swaggerOptions);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/docs", swaggerUi.serve);
router.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      ApiKeyAuth:
 *        type: apiKey
 *        in: header
 *        name: authorization
 *
 */

module.exports = router;
