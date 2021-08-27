const CacheService = require('./cache-service');
const cache = new CacheService(3600); // cache 1 hour
const CACHE_KEY = 'photo';

const Photo = require('../models').Photo;
const Caption = require('../models').Caption;

module.exports = {
  list(req, res) {
    return Photo
      .findAll({
        order: [
          ['createdAt', 'ASC'],
        ],
      })
      .then((photos) => res.status(200).send(photos))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return cache.get(`${CACHE_KEY}_${req.params.id}`, () => Photo
      .findByPk(req.params.id, {
        include: [{
          model: Caption,
          as: 'captions'
        }],
      }))
      .then((photo) => {
        if (!photo) {
          return res.status(404).send({
            message: 'Photo Not Found',
          });
        }
        return res.status(200).send(photo);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  add(req, res) {
    return Photo
      .create({
        name: req.body.name,
        url: req.body.url,
        citation: req.body.citation
      })
      .then((photo) => res.status(201).send(photo))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Photo
      .findByPk(req.params.id)
      .then(photo => {
        if (!photo) {
          return res.status(404).send({
            message: 'Photo Not Found',
          });
        }
        return photo
          .update({
            name: req.body.name || photo.name,
            url: req.body.url || photo.url,
            citation: req.body.citation || photo.citation
          })
          .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
          .then(() => res.status(200).send(photo))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Photo
      .findByPk(req.params.id)
      .then(photo => {
        if (!photo) {
          return res.status(400).send({
            message: 'Photo Not Found',
          });
        }
        return photo
          .destroy()
          .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
