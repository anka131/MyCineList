import Logo from "./Logo";
import styles from "./NavBar.module.css";

function Navbar({children}){
  

  return(
    <nav className={styles.navBar}>
      <Logo />
        {children}
      </nav>
  )
}
export default Navbar;