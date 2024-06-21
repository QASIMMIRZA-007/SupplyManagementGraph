import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../../firebaseConfig";

import { getDatabase, push, ref } from "firebase/database";
import { useNavigate } from "react-router";

import "./authform.css";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("Error aaa gya");

  // const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleForm = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const db = getDatabase();
  const auth = getAuth();
  const createUser = async (email, password, username) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/userinterface");
      const user = userCredentials.user;
      await push(ref(db, "/users"), {
        uid: user.uid,
        username: username,
        email: email,
      });
      alert("Account created successfully!");
    } catch (err) {
      alert("Invalid credentionals");
    }
  };

  const loginUser = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((val) => {
        console.log(val);
        navigate("/userinterface");
        alert("Account logged in successfully!");
      })
      .catch((err) => {
        console.log("Error logging in: ", err);
        setError(err.message);
        alert("Invalid credentionals");
      });
  };

  return (
    <div className="authMainContainer">
      <div className={`authContainer ${isSignUp ? "change" : ""}`}>
        <div className="forms-authContainer">
          <div className="form-control signup-form">
            <form onSubmit={handleSubmit}>
              <h2>Signup</h2>
              {/* <div className="socials">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-google-plus-g"></i>
                <i className="fab fa-linkedin-in"></i>
              </div> */}

              {/* <hr /> */}
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                required={true}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password "
                minLength={7}
                required
              />

              {/* <input type="password" placeholder="Confirm password" required /> */}
              <button onClick={() => createUser(email, password, username)}>
                Signup
              </button>
            </form>
          </div>
          <div className="form-control signin-form">
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              {/* <div className="socials">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-google-plus-g"></i>
                <i className="fab fa-linkedin-in"></i>
              </div> */}

              {/* <hr /> */}
              <input
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
              <input
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
              <button
                type={"button"}
                onClick={() => loginUser(email, password)}
              >
                Log in
              </button>
            </form>
          </div>
        </div>
        <div className="intros-authContainer">
          <div className="intro-control signin-intro">
            <div className="intro-control__inner">
              <h2>New Here</h2>
              <p>Sign up and discover a great amount of opportunities!</p>
              <button id="signup-btn" onClick={toggleForm}>
                Sign up
              </button>
            </div>
          </div>
          <div className="intro-control signup-intro">
            <div className="intro-control__inner">
              <h2>Welcome back</h2>
              <p>
                To keep connected with us please login with yoou personal info
              </p>
              <button id="signin-btn" onClick={toggleForm}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
