const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const captionService = require('../services/caption-service');

/**
 * @swagger
 * /captions/{id}:
 *    get:
 *      summary: Get an individual caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      parameters:
 *        - name: id
 *          description: caption id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns a caption
 *          schema:
 *            $ref: '#/components/schemas/Caption'
 *        "404":
 *          description: User not found
 */
router.get('/:id', captionService.getById);

/**
 * @swagger
 * /captions:
 *    post:
 *      summary: Creates a new caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      security:
 *        - ApiKeyAuth: []
 *      requestBody:
 *        description: Data for new caption
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Caption'
 *      responses:
 *        "201":
 *          description: returns created caption
 *          schema:
 *            $ref: '#/components/schemas/Caption'
 *        "401":
 *          description: User not authenticated
 */
router.post('/', auth, captionService.add);

/**
 * @swagger
 * /captions/{id}:
 *    put:
 *      summary: Updates a caption's comment
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: caption id to update
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Updated comment
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                comment:
 *                  type: string
 *                  example: This is an AMAZING photo
 *      responses:
 *        "201":
 *          description: returns updated caption
 *          schema:
 *            $ref: '#/components/schemas/Caption'
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to update this caption
 *        "404":
 *          description: caption not found
 */
router.put('/:id', auth, captionService.update);

/**
 * @swagger
 * /captions/{id}:
 *    delete:
 *      summary: Deletes a caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: caption id to delete
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: caption deleted
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to delete this caption
 *        "404":
 *          description: caption not found
 */
router.delete('/:id', auth, captionService.delete);

module.exports = router;
