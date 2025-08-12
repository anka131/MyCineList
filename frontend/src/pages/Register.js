import { useState } from "react";
import styles from "./Login.module.css";
import { Link} from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Optional: Basic validation
    if (!username.trim || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
       await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, password }),
      });
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({email, password}),
          });


      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Register failed");
        return;
      }

 
      localStorage.setItem("token", data.token);

      // Optional: redirect or toggle state
      console.log("Register successful");
      window.location.reload(); 

    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleRegister} className={styles.loginForm}>
        <h2>Register</h2>

        {error && <p className={styles.error}>{error}</p>}
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Sign up
        </button>
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  );
}

export default Register;
