const express = require('express');
const { getOpportunities, applyForOpportunity } = require('../controllers/opportunityController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getOpportunities);
router.route('/:id/apply').post(protect, applyForOpportunity);

module.exports = router;
