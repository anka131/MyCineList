
import {useNavigate } from 'react-router-dom';
import styles from '../ThemeToggle.module.css'

function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login"); // or wherever you want to send the user
};
  return (
    <button className={styles.themeToggle} onClick={handleLogout}>Logout</button>
  )
}

export default Logout