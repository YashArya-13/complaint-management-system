const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const nodemailer = require('nodemailer');  // <-- Yaha Import Karo

// Dummy Email Config (sirf console me dikhayega)
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: 'dummy@example.com',
    pass: 'dummyPassword'
  }
});

// Create Complaint
router.post('/', async (req, res) => {
  const complaint = new Complaint(req.body);
  await complaint.save();

  // Dummy Email (Console me message show karega)
  await transporter.sendMail({
    from: '"Complaint System" <dummy@example.com>',
    to: 'admin@example.com',
    subject: 'New Complaint Submitted',
    text: `New Complaint: ${complaint.title} (${complaint.category}, Priority: ${complaint.priority})`
  });

  res.send({ message: 'Complaint Submitted Successfully' });
});

// Get Complaints
router.get('/', async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// Update Complaint
router.put('/:id', async (req, res) => {
  const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });

  // Dummy Email on Status Update
  await transporter.sendMail({
    from: '"Complaint System" <dummy@example.com>',
    to: 'admin@example.com',
    subject: 'Complaint Status Updated',
    text: `Complaint Updated: ${updatedComplaint.title}, New Status: ${updatedComplaint.status}`
  });

  res.send({ message: 'Complaint Updated Successfully' });
});

// Delete Complaint
router.delete('/:id', async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.send({ message: 'Complaint Deleted Successfully' });
});

module.exports = router;
