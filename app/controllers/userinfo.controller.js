const db = require("../models");
const UserInfo = db.userInfos;
const Op = db.Sequelize.Op;

// Create and Save a new UserInfo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a UserInfo
  const userInfo = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save UserInfo in the database
  UserInfo.create(userInfo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserInfo."
      });
    });
};

// Retrieve all UserInfos from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  UserInfo.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userInfos."
      });
    });
};

// Find a single UserInfo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserInfo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find UserInfo with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving UserInfo with id=" + id
      });
    });
};

// Update a UserInfo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UserInfo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserInfo was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update UserInfo with id=${id}. Maybe UserInfo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating UserInfo with id=" + id
      });
    });
};

// Delete a UserInfo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserInfo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserInfo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete UserInfo with id=${id}. Maybe UserInfo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete UserInfo with id=" + id
      });
    });
};

// Delete all UserInfos from the database.
exports.deleteAll = (req, res) => {
  UserInfo.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} UserInfos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userInfos."
      });
    });
};

// find all published UserInfo
exports.findAllPublished = (req, res) => {
  UserInfo.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userInfos."
      });
    });
};