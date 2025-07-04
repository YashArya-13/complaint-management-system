const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const complaintRoutes = require('./routes/complaintRoutes');  // This should work

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
