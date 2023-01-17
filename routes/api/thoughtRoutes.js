const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtControllers.js');

// //  /api/thoughts
// router.route('/').get(getThoughts).post(createThought);

// //  /api/thoughts/:thoughtId
// router.route('/:thoughId').get(getOneThought).put(updateThought).delete(deleteThought);

// // /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/reactions').post(createReaction);

// //  /api/thoughts/:thoughId/reaction/:reactionId
// router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;