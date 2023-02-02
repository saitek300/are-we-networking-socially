const { Schema, Types } = require('mongoose');


const friendSchema = new Schema(
    {
        friendId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },

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
    }

)



module.exports = friendSchema;