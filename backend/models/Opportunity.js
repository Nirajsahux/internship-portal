const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema({
  profileName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  stipend: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;
