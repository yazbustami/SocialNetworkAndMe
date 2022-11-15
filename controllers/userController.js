const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then ((users) => res.json(users))
        .catch((err) => res.status(500).json(err));

    },
    // get single or ONE user
getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then((user) =>
    !user
    ? res.status(404).json({ message : 'no user found'})
    : res.json(user))

    .catch((err) => 
        res.status(500).json(err));
},

// adding a user
addUser(req,res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
},

// updating a user
updateUser(req, res) {
    User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })

    .then((user) => 
    !user
    ? res.status(404).json({ message : 'no id match'})
    : res.json(user))

    .catch((err) => {
        res.status(500).json(err);
    }); 
},

// deleting a user
deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
    .then((user) =>
    !user
    ? res.status(404).json({ message : 'no id match'})
    : res.json({'user deleted'}))

    .catch((err) => res.status(500).json(err));
},

// adding a friend
addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true })
            
            .then((user) => 
            !user
            ? res.status(404).json({ message : 'no id match'})
            : res.json(user))
        
            .catch((err) => {
                res.status(500).json(err);
            }); 
},

// deleting a friend
deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true })
        
        .then((user) => 
        !user
            ? res.status(404).json({ message : 'no id match'})
             : res.json(user))
    
        .catch((err) => {
            res.status(500).json(err);
        }); 
},
}