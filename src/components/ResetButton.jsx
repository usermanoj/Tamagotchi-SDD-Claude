import styles from './ResetButton.module.css';

export default function ResetButton({ onReset }) {
  function handleClick() {
    if (window.confirm('Reset all progress? ChuChu will start fresh. 🐾')) {
      onReset();
    }
  }

  return (
    <button className={styles.btn} onClick={handleClick}>
      🔄 Reset
    </button>
  );
}
