import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/AvailabilityForm.module.css';

const AvailabilityForm = () => {
  const [user, setUser] = useState('');
  const [availability, setAvailability] = useState([]);

  const handleAddAvailability = () => {
    setAvailability([...availability, { day: '', start: '', end: '' }]);
  };

  const handleRemoveAvailability = (index) => {
    const newAvailability = availability.filter((_, i) => i !== index);
    setAvailability(newAvailability);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/availability', {
        user,
        availability,
      });
      alert('Availability saved successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Failed to save availability.');
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="email" className={styles.label}>Email:</label>
      <input
        type="text"
        placeholder="Enter email"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className={styles.inputField}
      />
      {availability.map((slot, index) => (
        <div key={index} className={styles.slotContainer}>
          <label className={styles.label}>Day:</label>
          <input
            type="text"
            placeholder="Day"
            value={slot.day}
            onChange={(e) => {
              const newAvailability = [...availability];
              newAvailability[index].day = e.target.value;
              setAvailability(newAvailability);
            }}
            className={styles.inputField}
          />
          <label className={styles.label}>Start Time:</label>
          <input
            type="time"
            value={slot.start}
            onChange={(e) => {
              const newAvailability = [...availability];
              newAvailability[index].start = e.target.value;
              setAvailability(newAvailability);
            }}
            className={styles.inputField}
          />
          <label className={styles.label}>End Time:</label>
          <input
            type="time"
            value={slot.end}
            onChange={(e) => {
              const newAvailability = [...availability];
              newAvailability[index].end = e.target.value;
              setAvailability(newAvailability);
            }}
            className={styles.inputField}
          />
          <button
            type="button"
            onClick={() => handleRemoveAvailability(index)}
            className={styles.removeBtn}
          >
            Remove
          </button>
        </div>
      ))}
      <button className={styles.addBtn} onClick={handleAddAvailability}>Add Availability</button>
      <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AvailabilityForm;

