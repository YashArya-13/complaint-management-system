import { useEffect, useState } from 'react';
import axios from 'axios';

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res = await axios.get('http://localhost:5000/api/complaints');
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

 const handleStatusChange = async (id, newStatus) => {
  try {
    await axios.put(`http://localhost:5000/api/complaints/${id}`, { status: newStatus });
    alert('Status Updated Successfully');
    fetchComplaints();
  } catch (err) {
    console.error(err);
    alert('Failed to update status');
  }
};


  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.title}</td>
              <td>{complaint.category}</td>
              <td>{complaint.priority}</td>
              <td>{complaint.status}</td>
              <td>
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;
