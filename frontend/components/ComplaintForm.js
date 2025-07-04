import { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/complaints', formData);
    alert('Complaint Submitted Successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required /><br />
      <textarea name="description" placeholder="Description" onChange={handleChange} required /><br />
      <select name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Product">Product</option>
        <option value="Service">Service</option>
        <option value="Support">Support</option>
      </select><br />
      <div>
        <label>
          <input type="radio" name="priority" value="Low" onChange={handleChange} /> Low
        </label>
        <label>
          <input type="radio" name="priority" value="Medium" onChange={handleChange} /> Medium
        </label>
        <label>
          <input type="radio" name="priority" value="High" onChange={handleChange} /> High
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
