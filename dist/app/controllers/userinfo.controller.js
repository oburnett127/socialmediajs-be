var db2 = require("../models");
var UserInfo = db2.userinfo;
// Create and Save a new UserInfo
exports.create = function (req, res) {
    // Create a UserInfo
    var userInfo = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false
    };
    // Save UserInfo in the database
    UserInfo.create(userInfo)
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the UserInfo."
        });
    });
};
// Retrieve all UserInfos from the database.
exports.findAll = function (req, res) {
    UserInfo.findAll()
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving userInfos."
        });
    });
};
// Find a single UserInfo with an id
exports.findOne = function (req, res) {
    var id = req.params.id;
    UserInfo.findByPk(id)
        .then(function (data) {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: "Cannot find UserInfo with id=".concat(id, ".")
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Error retrieving UserInfo with id=" + id
        });
    });
};
// Update a UserInfo by the id in the request
exports.update = function (req, res) {
    var id = req.params.id;
    UserInfo.update(req.body, {
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "UserInfo was updated successfully."
            });
        }
        else {
            res.send({
                message: "Cannot update UserInfo with id=".concat(id, ". Maybe UserInfo was not found or req.body is empty.")
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Error updating UserInfo with id=" + id
        });
    });
};
// Delete a UserInfo with the specified id in the request
exports.delete = function (req, res) {
    var id = req.params.id;
    UserInfo.destroy({
        where: { id: id }
    })
        .then(function (num) {
        if (num == 1) {
            res.send({
                message: "UserInfo was deleted successfully."
            });
        }
        else {
            res.send({
                message: "Cannot delete UserInfo with id=".concat(id, ". Maybe UserInfo was not found.")
            });
        }
    })
        .catch(function (err) {
        res.status(500).send({
            message: "Could not delete UserInfo with id=" + id
        });
    });
};
// Delete all UserInfos from the database.
exports.deleteAll = function (req, res) {
    UserInfo.destroy({
        where: {},
        truncate: false
    })
        .then(function (nums) {
        res.send({ message: "".concat(nums, " UserInfos were deleted successfully.") });
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all userInfos."
        });
    });
};
// find all published UserInfo
exports.findAllPublished = function (req, res) {
    UserInfo.findAll({ where: { published: true } })
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving userInfos."
        });
    });
};
