const { Thought, User } = require('../models');

module.exports = {
    //find all thoughts
    getThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then((thoughts) => {
                res.json(thoughts);
            })
            .catch((err) => {
                console.log(err);
                res.status(500), json(err);
            });
    },
    //find thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({ thought })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //create new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) =>{
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                  );
                })
                .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'thought does not exist' })
                    : res.json({ thought })
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({ thought })
            )
    },
    //update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'thought does not exist' })
                    : res.json({ thought })
            )
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          )
            .then((thought) => {
              !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
              
                : res.json(thought);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
        },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No reaction found with that ID :(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

};