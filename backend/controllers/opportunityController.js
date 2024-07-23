const asyncHandler = require('express-async-handler');
const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

// @desc    Fetch all opportunities
// @route   GET /api/opportunities
// @access  Public
const getOpportunities = asyncHandler(async (req, res) => {
  const opportunities = await Opportunity.find({});
  res.json(opportunities);
});

// @desc    Apply for an opportunity
// @route   POST /api/opportunities/:id/apply
// @access  Private
const applyForOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (opportunity) {
    if (!opportunity.applicants.includes(req.user._id)) {
      opportunity.applicants.push(req.user._id);
      await opportunity.save();
      res.json({ message: 'Applied successfully' });
    } else {
      res.status(400);
      throw new Error('You have already applied for this opportunity');
    }
  } else {
    res.status(404);
    throw new Error('Opportunity not found');
  }
});

module.exports = {
  getOpportunities,
  applyForOpportunity,
};
