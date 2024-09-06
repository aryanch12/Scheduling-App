import AvailabilityForm from '../components/AvailabilityForm';
import Testimonials from '../components/Testimonials';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Welcome to the Scheduling App</h1>
        <p>"Plan better, save time."</p>
      </div>
      
      <div className={styles.formSection}>
        <h2>Set Your Availability</h2>
        <AvailabilityForm />
      </div>

      <div className={styles.testimonialsSection}>
        <h2>What Our Users Say</h2>
        <Testimonials />
      </div>
    </div>
  );
}
