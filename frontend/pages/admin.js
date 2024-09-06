import AvailabilityCalendar from '../components/AvailabilityCalendar';
import SessionScheduler from '../components/SessionScheduler';

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AvailabilityCalendar />
      <SessionScheduler />
    </div>
  );
}
