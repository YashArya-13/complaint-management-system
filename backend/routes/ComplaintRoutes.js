const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const sendEmail = require('../utils/email');

// Create Complaint
router.post('/', async (req, res) => {
  const complaint = new Complaint(req.body);
  await complaint.save();

  // Send Email Notification to Admin
  await sendEmail(
    'adminemail@example.com', 
    'New Complaint Submitted',
    `Title: ${complaint.title}\nCategory: ${complaint.category}\nPriority: ${complaint.priority}\nDescription: ${complaint.description}`
  );

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
  
  // Send Email Notification to Admin
  await sendEmail(
    'adminemail@example.com',
    'Complaint Status Updated',
    `Complaint ID: ${req.params.id}\nNew Status: ${req.body.status}`
  );

  res.send({ message: 'Complaint Updated Successfully' });
});


// Delete Complaint
router.delete('/:id', async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.send({ message: 'Complaint Deleted Successfully' });
});

module.exports = router;
