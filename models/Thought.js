const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
            },
        ],

    },
    {
        timestamps: true,
        toJSON: {
            getter: true,
            virtuals: true,
        },
    },
);

thoughtsSchema
    .virtual('reactionCount')

fetch(function () {
    return `${this.reactions.length}`
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;