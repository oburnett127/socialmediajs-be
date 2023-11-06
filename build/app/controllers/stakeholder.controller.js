var db3 = require("../models");
var Stakeholder = db3.stakeholder;
// Create and Save a new Stakeholder
exports.create = function (req, res) {
    // Create a Stakeholder
    var stakeholder = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    // Save Stakeholder in the database
    Stakeholder.create(stakeholder)
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Stakeholder."
        });
    });
};
// Retrieve all Stakeholders from the database.
exports.findAll = function (req, res) {
    Stakeholder.findAll()
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stakeholders."
        });
    });
};
// Find a single Stakeholder with an id
exports.findOne = function (req, res) {
    var id = req.params.id;
    Stakeholder.findByPk(id)
        .then(function (data) {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: "Cannot find Stakeholder with id=".concat(id, ".")
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Error retrieving Stakeholder with id=" + id
        });
    });
};
// Update a Stakeholder by the id in the request
exports.update = function (req, res) {
    var id = req.params.id;
    Stakeholder.update(req.body, {
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "Stakeholder was updated successfully."
            });
        }
        else {
            res.send({
                message: "Cannot update Stakeholder with id=".concat(id, ". Maybe Stakeholder was not found or req.body is empty.")
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Error updating Stakeholder with id=" + id
        });
    });
};
// Delete a Stakeholder with the specified id in the request
exports.delete = function (req, res) {
    var id = req.params.id;
    Stakeholder.destroy({
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "Stakeholder was deleted successfully."
            });
        }
        else {
            res.send({
                message: "Cannot delete Stakeholder with id=".concat(id, ". Maybe Stakeholder was not found.")
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Could not delete Stakeholder with id=" + id
        });
    });
};
// Delete all Stakeholders from the database.
exports.deleteAll = function (req, res) {
    Stakeholder.destroy({
        where: {},
        truncate: false
    })
        .then(function (nums) {
        res.send({ message: "".concat(nums, " Stakeholders were deleted successfully.") });
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all stakeholders."
        });
    });
};
// find all published Stakeholder
exports.findAllPublished = function (req, res) {
    Stakeholder.findAll({ where: { published: true } })
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stakeholders."
        });
    });
};
