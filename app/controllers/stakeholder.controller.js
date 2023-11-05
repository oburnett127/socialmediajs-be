const db = require("../models");
const Stakeholder = db.stakeholders;
const Op = db.Sequelize.Op;

// Create and Save a new Stakeholder
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Stakeholder
  const stakeholder = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Stakeholder in the database
  Stakeholder.create(stakeholder)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stakeholder."
      });
    });
};

// Retrieve all Stakeholders from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Stakeholder.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stakeholders."
      });
    });
};

// Find a single Stakeholder with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Stakeholder.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Stakeholder with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Stakeholder with id=" + id
      });
    });
};

// Update a Stakeholder by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Stakeholder.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Stakeholder was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Stakeholder with id=${id}. Maybe Stakeholder was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Stakeholder with id=" + id
      });
    });
};

// Delete a Stakeholder with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Stakeholder.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Stakeholder was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Stakeholder with id=${id}. Maybe Stakeholder was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Stakeholder with id=" + id
      });
    });
};

// Delete all Stakeholders from the database.
exports.deleteAll = (req, res) => {
  Stakeholder.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Stakeholders were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stakeholders."
      });
    });
};

// find all published Stakeholder
exports.findAllPublished = (req, res) => {
  Stakeholder.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stakeholders."
      });
    });
};