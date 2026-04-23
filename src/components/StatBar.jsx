import styles from './StatBar.module.css';
import { STAT_MAX } from '../utils/constants';

function getColorClass(value) {
  if (value >= 50) return styles.green;
  if (value >= 25) return styles.amber;
  return styles.red;
}

export default function StatBar({ label, value, emoji }) {
  const pct = (value / STAT_MAX) * 100;
  const colorClass = getColorClass(value);

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{emoji} {label}</span>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
