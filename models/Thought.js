const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max:280,
        },
        username: {
            type:String,
            required: true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
    });

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
        reactions: [reactionSchema],

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

.get(function () {
    return `${this.reactions.length}`
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;