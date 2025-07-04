const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Create Complaint
router.post('/', async (req, res) => {
  const complaint = new Complaint(req.body);
  await complaint.save();
  res.send({ message: 'Complaint Submitted Successfully' });
});

// Get Complaints
router.get('/', async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// Update Complaint
router.put('/:id', async (req, res) => {
  await Complaint.findByIdAndUpdate(req.params.id, req.body);
  res.send({ message: 'Complaint Updated Successfully' });
});

// Delete Complaint
router.delete('/:id', async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.send({ message: 'Complaint Deleted Successfully' });
});

module.exports = router;
