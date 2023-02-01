// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    //find all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                res.json(users);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500), json(err);
            });
    },
    //find user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({ user })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //create new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //delete user by id
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'user does not exist' })
                    : Thought.findOneAndRemove(
                        { _id: req.params.userId }
                    )
            )
    },
    //update user by id
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId})
        .then((user) =>
        !user
            ? res.status(404).json({message: 'user does not exist'})
            : Thought.findOneAndUpdate(
                {_id: req.params.userId}
            )
        )
    },

    newFriend(req, res) {
        User.findOneAndUpdate(
        {_id:req.params.userId},
        {$addToSet:{friends: req.body}},
        
        )
        .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { user: { friends: req.params.friends } } },
         
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
};