import { useState } from "react";
import styles from './Box.module.css';

function Box({children, isDark}){
  

  const [isOpen, setIsOpen] = useState(true);

  return(
    <div className={`${styles.box} ${isDark ? styles.boxDark : styles.boxLight}`}>
    <button
      className={styles.btnToggle}
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
 { isOpen && children }
  </div>
  )
}
export default Box;