const db = require('../models');
const createError = require('http-errors');
const Temple = db.temples;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = (req, res) => {
  //#swagger.tags=['Tempes']
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Temple
  const temple = new Temple({
    temple_id: req.body.temple_id,
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
  });
  // Save Temple in the database
  temple
    .save(temple)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Temple.',
      });
    });
};

exports.findAll = async (req, res, next) => {
  try {
    //#swagger.tags=['Tempes']
    console.log(req.header('apiKey'));
    if (req.header('apiKey') !== apiKey) {
      throw createError(422, 'Invalid apiKey, please read the documentation.')
    }
    const response = await Temple.find({},
        {
          temple_id: 1,
          name: 1,
          location: 1,
          dedicated: 1,
          additionalInfo: 1,
          _id: 0,
        }
      )

    if (response.length <= 0) throw createError(404, 'Not Data found');

    return res
            .status(200)
            .json(response);

  } catch (err) {
    return next(err);
  };
}

// Find a single Temple with an id
exports.findOne = async (req, res, next) => {
  try {
    //#swagger.tags=['Tempes']
    const temple_id = req.params.temple_id;
    if (req.header('apiKey') !== apiKey) {
      throw createError(422, 'Invalid apiKey, please read the documentation.')
    }
    const response = await Temple.find({ temple_id: temple_id });
    if (!respnse || response.length <= 0) throw createError(404, 'Not found Temple with id ' + temple_id);

    return res
            .status(200)
            .json(response[0]);
  } catch (err) {
    return next(err);
  }
};


exports.update = (req, res) => {
  //#swagger.tags=['Tempes']
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Temple.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
        });
      } else return res.send({ message: 'Temple was updated successfully.' });
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Error updating Temple with id=' + id,
      });
    });
};

 // Delete a Temple with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    //#swagger.tags=['Tempes']
    const id = req.params.id;
  
    const reaponse = await Temple.findByIdAndRemove(id);

    if (!response) throw createError(404, `Cannot delete Temple with id=${id}. Maybe Temple was not found!`);

    return res.status(202).send('Temple was deleted successfully!');

  } catch (err) {
    return next(err);
  }
};

 // Delete all Temples from the database.
exports.deleteAll = (req, res) => {
  //#swagger.tags=['Tempes']
  Temple.deleteMany({})
    .then((data) => {
      return res.send({
        message: `${data.deletedCount} Temples were deleted successfully!`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all temple.',
      });
    });
};

 // Find all published Temples
exports.findAllPublished = (req, res) => {
  //#swagger.tags=['Tempes']
  Temple.find({ published: true })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving temple.',
      });
    });
};
