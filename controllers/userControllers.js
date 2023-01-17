const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

// .aggregate() needed?

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    // get one user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create new user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },
    // update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
         !user
          ? res.status(404).json({ message: 'No user with that id!' })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // delete user and associated thoughts
    deleteUser(req, res) {
      User.findOneAndDelete(
        { _id: req.params.userId }
      )
      .then((user) =>
       !course
        ? res.status(404).json({ message: 'No user with that id!'})
        : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
      .then(() => res.json({ message: 'User and thoughts successfully deleted!' }))
      .catch((err) => res.status(500).json(err));
    }
}