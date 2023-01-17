// require dependencies and connected files
const { Schema, model, Types } = require('mongoose');
const thoughtSchema = require('./Thought');

// new instance of Mongoose schema to define User document
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                'Please use a valid email.' 
            ],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId, 
            ref: "User",
        }]
    },
    {
        // what is this doing again?
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// virtual property friendCount gets the number of friends each user has
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// create User model using UserSchema
const User = model('User', userSchema);

module.exports = User;