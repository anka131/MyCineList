
import styles from "./ThemeToggle.module.css";

export function ThemeToggle({ isDark, toggleTheme }) {

  return (
    <button className={styles.themeToggle} onClick={toggleTheme}>
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

