const { Thought, User } = require('../models');

const thoughtController = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
// Single/one thought
getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) =>
    !thought
    ? res.status(404).json({ message: 'NONE FOUND'})
    :res.json(thought))
    .catch((err) => res.status(500).json(err));
},
//  adding/creating a thought
addThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id }},
            { new: true }
            );
        })

    .then((user) => 
    !user
    ? res.status(404).json({ message : 'thought created, but no id match'})
    : res.json('created thought'))

    .catch((err) => {
        res.status(500).json(err);
    }); },

    // updating a thought

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })

    .then((thought) => 
    !thought
    ? res.status(404).json({ message : 'NO THOUGHT'})
    : res.json('thought'))

    .catch((err) => {
        res.status(500).json(err);
    });
    },

    // deleting a thought
   deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) => 
            !thought
            ? res.status(404).json({ message : 'No THOUGHT'})
            : res.json({ message: 'thought deleted'})
            )

            .catch((err) => res.status(500).json(err));
        }, 

// adding a new reaction
createReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true })

.then((thought) => 
!thought
? res.status(404).json({ message : 'NO THOUGHT'})
: res.json('thought'))

.catch((err) => 
    res.status(500).json(err));
},

// deleting a reaction

deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {reactionId: req.params.reactionId }}},
        { runValidators: true, new: true })

.then((thought) => 
!thought
? res.status(404).json({ message : 'NO THOUGHT'})
: res.json('thought'))

.catch((err) => 
    res.status(500).json(err));
    }, }

    module.exports = thoughtController;