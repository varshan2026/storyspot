const express = require('express')
const router = express.Router();
const {postStory, getStory, getStoryId, updateStory, deleteStory} = require('../controllers/storyHandler');

router.post('/story', postStory);
router.get('/story', getStory)
router.get('/story/:_id', getStoryId)
router.put('/story/:_id', updateStory)
router.delete('/story/:_id', deleteStory)

module.exports = router;

