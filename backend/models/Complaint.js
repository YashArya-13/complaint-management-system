const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  priority: String,
  status: { type: String, default: 'Pending' },
  dateSubmitted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);
