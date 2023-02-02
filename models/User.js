const { Schema, model } = require('mongoose');
const Friend = require('./Friend')


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type:String,
            required: true,
            unique: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                'Please add a valid email address.',
            ],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought', 
            }
        ],
        friends: [Friend],
    },
    {
        toJSON: {
            virtuals: true,
          }
    }
);

userSchema
    .virtual('friendCount')

    .get(function () {
        return `${this.friends.length}`
    });

const User = model('User', userSchema);

module.exports = User;


