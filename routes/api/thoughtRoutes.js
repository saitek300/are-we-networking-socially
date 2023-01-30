const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
} = require('../../controllers/ThoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:ThoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;