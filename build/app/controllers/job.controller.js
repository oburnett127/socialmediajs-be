var db4 = require("../models");
var Job = db4.jobs;
// Create and Save a new job
exports.create = function (req, res) {
    // Create a job
    var job = {
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        postDate: req.body.postDate
    };
    // Save job in the database
    Job.create(job)
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Job."
        });
    });
};
// Retrieve all Jobs from the database.
exports.findAll = function (req, res) {
    Job.findAll()
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving jobs."
        });
    });
};
// Find a single Job with an id
exports.findOne = function (req, res) {
    var id = req.params.id;
    Job.findByPk(id)
        .then(function (data) {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: "Cannot find Job with id=".concat(id, ".")
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Error retrieving Job with id=" + id
        });
    });
};
// Update a Job by the id in the request
exports.update = function (req, res) {
    var id = req.params.id;
    Job.update(req.body, {
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "Job was updated successfully."
            });
        }
        else {
            res.send({
                message: "Cannot update Job with id=".concat(id, ". Maybe Job was not found or req.body is empty.")
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Error updating Job with id=" + id
        });
    });
};
// Delete a Job with the specified id in the request
exports.delete = function (req, res) {
    var id = req.params.id;
    Job.destroy({
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "Job was deleted successfully."
            });
        }
        else {
            res.send({
                message: "Cannot delete Job with id=".concat(id, ". Maybe Job was not found.")
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Could not delete Job with id=" + id
        });
    });
};
// Delete all Jobs from the database.
exports.deleteAll = function (req, res) {
    Job.destroy({
        where: {},
        truncate: false
    })
        .then(function (nums) {
        res.send({ message: "".concat(nums, " Jobs were deleted successfully.") });
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all jobs."
        });
    });
};
// find all published Job
exports.findAllPublished = function (req, res) {
    Job.findAll({ where: { published: true } })
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving jobs."
        });
    });
};
