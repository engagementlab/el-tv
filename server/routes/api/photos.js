'use strict';

const Photo = require('../../models/Photo');

module.exports = (app) => {
  app.get('/api/photos', (req, res, next) => {
    Photo.find({}, 'url')
      .exec()
      .then((photo) => res.json(photo))
      .catch((err) => next(err));
  });

  app.post('/api/photos', function (req, res, next) {
    const photo = new Photo({
      url: req.headers.url
    });

    photo.save()
      .then(() => res.json(photo))
      .catch((err) => next(err));
  });
/*
  app.delete('/api/photos/:id', function (req, res, next) {
    Photo.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((photo) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/photos/:id/increment', (req, res, next) => {
    Photo.findById(req.params.id)
      .exec()
      .then((photo) => {
        photo.count++;

        photo.save()
          .then(() => res.json(photo))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/photos/:id/decrement', (req, res, next) => {
    Photo.findById(req.params.id)
      .exec()
      .then((photo) => {
        photo.count--;

        photo.save()
          .then(() => res.json(photo))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });*/
};
