const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    addThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(addThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;