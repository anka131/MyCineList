import styles from './Error.module.css';
function Error({message}){
  return <p className={styles.error}><span>⛔</span>{message}</p>
}
export default Error;