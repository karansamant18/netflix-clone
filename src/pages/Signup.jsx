import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        h1 {
          padding: 0 15rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showpassword }) =>
          showpassword ? "1fr 1fr" : "2fr 1fr"};
        flex-direction: column;
        width: 50rem;
        align-items: center;
        margin-top: 2rem;
        input {
          border: none;
          color: black;
          padding: 0.5rem 1rem 0.5rem 0.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          background-color: #e50914;
          padding: 0.5rem 1rem 0.5rem 0.5rem;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.2rem;
        }
      }
      .login-btn {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        width: 6rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        margin-top: 1rem;
        align-self: center;
      }
    }
  }
`;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showpassword={showPassword ? "true" : undefined}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body">
          <div className="text">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
            <div className="form">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              {showPassword && (
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              )}
              {!showPassword && (
                <button onClick={() => setShowPassword(true)}>
                  Get Started
                </button>
              )}
            </div>
            <button className="login-btn" onClick={handleSignIn}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
