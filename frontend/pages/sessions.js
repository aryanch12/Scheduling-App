import { useState, useEffect } from 'react';
import axios from 'axios';

const SessionsPage = () => {
  const [email, setEmail] = useState('');
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    const response = await axios.get(`http://localhost:5000/api/sessions?email=${email}`);
    setSessions(response.data);
  };

  useEffect(() => {
    if (email) {
      fetchSessions();
    }
  }, [email]);

  return (
    <div>
      <h2>Your Sessions</h2>
      <input
        type="email"
        placeholder="Enter your email to view sessions"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <ul>
        {sessions.map(session => (
          <li key={session._id}>
            Date: {session.date}, Time: {session.start} - {session.end}, Type: {session.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionsPage;
