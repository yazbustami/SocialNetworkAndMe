const { connect, connection } = require('mongoose');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/SocialNetwork&Me', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
