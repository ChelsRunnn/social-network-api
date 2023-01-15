const { Schema, model } = require('mongoose');

// reactionSchema defines the reaction sub-document 
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            // ref to userSchema username?
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method to format timestamp
        }
    });
// new instance of mongoose schema to define Thought document
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: Schema.Types.username,
            // default: () => new Types.ObjectId(), 
            // ? ((something like this needed?))
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// virtual property reactionCount gets the number of reactions on each thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});
// seed data for reactions
const reactionData = [
    { reactionBody: 'LOVE this for you' },
    { reactionBody: 'Killing it!' },
    { reactionBody: 'Actually crying, this is TOO funny!!' },
    { reactionBody: 'Dang, you wildin!' },  ];
// initialize the Though model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;