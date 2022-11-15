const { Schema, model } = require('mongoose');
const { Thought } = require('.');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date),
        },

        username: {
            type: String,
            required: true,

        },

        description: {
            type: String,
            minlength: 10,
            maxlength: 400,
        },

        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
        }
);

thoughtSchema
.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const thought = model('thought', thoughtSchema);
module.exports = thought;