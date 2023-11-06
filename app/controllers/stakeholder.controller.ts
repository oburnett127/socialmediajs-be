const db3 = require("../models");
const Stakeholder = db3.stakeholder;

// Create and Save a new Stakeholder
exports.create = (req, res) => {
  // Create a Stakeholder
  const stakeholder = {
    firstName: req.body.firstName,
    lastName: req.body.lastName
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
  
  Stakeholder.findAll()
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
          message: `Cannot update Stakeholder with id=${id}. Maybe Stakeholder was not found or req.body is empty.`
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
          message: "Stakeholder was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Stakeholder with id=${id}. Maybe Stakeholder was not found.`
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
      res.send({ message: `${nums} Stakeholders were deleted successfully.` });
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