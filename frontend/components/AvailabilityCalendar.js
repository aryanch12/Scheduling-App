import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AvailabilityCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      const response = await axios.get('http://localhost:5000/api/availability');
      const availability = response.data;

      const events = availability.flatMap(userAvail =>
        userAvail.slots.map(slot => ({
          title: userAvail.userEmail,
          start: new Date(`${slot.date}T${slot.start}`),
          end: new Date(`${slot.date}T${slot.end}`),
        }))
      );

      setEvents(events);
    };

    fetchAvailability();
  }, []);

  return (
    <div>
      <h2>User Availability</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default AvailabilityCalendar;
