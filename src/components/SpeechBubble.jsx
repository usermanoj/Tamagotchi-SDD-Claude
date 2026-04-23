import { useEffect, useState } from 'react';
import styles from './SpeechBubble.module.css';

export default function SpeechBubble({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div className={`${styles.bubble} ${visible ? styles.show : styles.hide}`}>
      <p className={styles.text}>{message}</p>
      <div className={styles.tail} />
    </div>
  );
}
