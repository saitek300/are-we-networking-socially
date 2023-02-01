const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    removeReaction,
} = require('../../controllers/ThoughtController');
// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// /api/thoughts/:thoughtId
router.route('/:ThoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;