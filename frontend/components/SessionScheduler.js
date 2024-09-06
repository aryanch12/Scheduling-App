import { useState, useEffect } from 'react';
import axios from 'axios';

const SessionScheduler = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [sessionDetails, setSessionDetails] = useState({
    date: '',
    start: '',
    end: '',
    attendees: [],
    type: 'one-on-one',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/api/availability');
      setUsers(response.data.map(u => u.userEmail));
    };

    fetchUsers();
  }, []);

  const handleUserSelection = async email => {
    setSelectedUserEmail(email);
    const response = await axios.get(`http://localhost:5000/api/availability?email=${email}`);
    setAvailableSlots(response.data.slots);
  };

  const handleScheduleSession = async () => {
    try {
      await axios.post('http://localhost:5000/api/sessions', {
        adminEmail: 'admin@example.com',
        date: sessionDetails.date,
        start: sessionDetails.start,
        end: sessionDetails.end,
        attendees: [{ email: selectedUserEmail }],
        type: sessionDetails.type,
      });
      alert('Session scheduled');
    } catch (error) {
      console.error(error);
      alert('Error scheduling session');
    }
  };

  return (
    <div>
      <h2>Schedule Session</h2>
      <select onChange={e => handleUserSelection(e.target.value)}>
        <option value="">Select User</option>
        {users.map(email => (
          <option key={email} value={email}>
            {email}
          </option>
        ))}
      </select>
      
      <button onClick={handleScheduleSession}>Schedule Session</button>
    </div>
  );
};

export default SessionScheduler;
