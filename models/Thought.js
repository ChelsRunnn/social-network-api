const { Schema, model, Types } = require('mongoose');
var moment = require('moment');
 // require moment().format(); 

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
            get: createdAtFormat => moment(createdAtFormat).format('h:mm a, MMM Do YY')
            // to format date
            // get: createdAt...
        },
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true,
        },
        id: false,
    });
// new instance of mongoose schema to define Thought document
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtFormat => moment(createdAtFormat).format('h:mm a, MMM Do YY')
        },
        username: {
            // type: Schema.Types.ObjectId, 
            // ref: 'User', 
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
// virtual property reactionCount gets the total number of reactions on each thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});
// seed data for reactions
const reactionData = [
    { reactionBody: 'LOVE this for you' },
    { reactionBody: 'Killing it!' },
    { reactionBody: 'Actually crying, this is TOO funny!!' },
    { reactionBody: 'Dang, you wildin!' },  ];
// create the Though model using thoughtSchema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;