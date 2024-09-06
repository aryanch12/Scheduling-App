import { useState, useEffect } from 'react';
import styles from '../styles/Testimonials.module.css';

const testimonials = [
  { id: 1, name: 'John Doe', feedback: 'This app made scheduling so much easier!' },
  { id: 2, name: 'Jane Smith', feedback: 'I love the clean interface and simple features.' },
  { id: 3, name: 'Sarah Lee', feedback: 'Highly recommend for busy professionals!' },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Rotating every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.testimonialContainer}>
      <p>"{testimonials[index].feedback}"</p>
      <h4>- {testimonials[index].name}</h4>
    </div>
  );
};

export default Testimonials;
