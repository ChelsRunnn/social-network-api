// require dependencies and connected files
const { Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought');

// new instance of Mongoose schema to define User document
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: true
        },
        thoughts: [thoughtSchema],
        // friends: [userSchema] + validate not self
    },
    {
        // what is this doing again?
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);
// virtual property friendCount gets the number of friends each user has
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// initialize User model
const User = model('User', userSchema);

module.exports = User;