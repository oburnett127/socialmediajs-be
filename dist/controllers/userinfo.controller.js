const db2 = require("../models");
const UserInfo = db2.userinfo;
// Create and Save a new UserInfo
exports.create = (req, res) => {
    // Create a UserInfo
    const userInfo = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false
    };
    // Save UserInfo in the database
    UserInfo.create(userInfo)
        .then(data => {
        res.send(data);
    })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the UserInfo."
        });
    });
};
// Retrieve all UserInfos from the database.
exports.findAll = (req, res) => {
    UserInfo.findAll()
        .then(data => {
        res.send(data);
    })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving userInfos."
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
        }
        else {
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
        }
        else {
            res.send({
                message: `Cannot update UserInfo with id=${id}. Maybe UserInfo was not found or req.body is empty.`
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
                message: "UserInfo was deleted successfully."
            });
        }
        else {
            res.send({
                message: `Cannot delete UserInfo with id=${id}. Maybe UserInfo was not found.`
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
        res.send({ message: `${nums} UserInfos were deleted successfully.` });
    })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all userInfos."
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
            message: err.message || "Some error occurred while retrieving userInfos."
        });
    });
};
