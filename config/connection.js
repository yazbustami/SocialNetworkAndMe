const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/SocialNetwork&Me', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
