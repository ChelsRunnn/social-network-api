const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err))
    },
    // get one thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No one has thought of that yet!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
     // create new thought
     createThought(req, res) {
        Thought.create(req.body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: {thoughts: _id } },
            { new: true }
            )
          })
          .then((thought) =>
           !thought
             ? res.status(404).json({ message: 'Whoops, error creating thought!'})
             : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
       // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
         !thought
          ? res.status(404).json({ message: 'No one has thought of that yet!' })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // delete thought and associated reactions
    deleteThought(req, res) {
      Thought.findOneAndDelete(
        { _id: req.params.thoughtId }
      )
      .then((thought) =>
       !course
        ? res.status(404).json({ message: 'No one has thought of that yet!'})
        : Thought.deleteMany({ _id: { $in: thought.reactions } })
        )
      .then(() => res.json({ message: 'Thought and associated reactions successfully deleted!' }))
      .catch((err) => res.status(500).json(err));
    },
    // create Reaction
    createReaction(req, res) {
        Reaction.create(req.body)
          .then((reaction) => res.json(reaction))
          .catch((err) => res.status(500).json(err));
      },
}