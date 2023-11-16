const express = require('express');
const router = express.Router();


const progressController = require('..controllers/progress');

router.get('/', progressController.getAll);
router.get('/:username',  progressController.getProgress);
router.put('/:id', progressController.updateProgress);
router.post('/', progressController.createProgress);
router.delete('/:id', progressController.deleteProgress);


module.exports = router;