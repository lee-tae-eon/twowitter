import React, { useState } from "react";
import { authServ } from "Fbase";
import styled from "styled-components";
import { MainBackColor, MainColor } from "./_variables";

const LogForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  input {
    width: 100%;
    /* text-align: center; */
    color: black;
    padding: 10px 20px;
    border: 1px solid black;
    border-radius: 20px;
    background-color: white;
    &[type="submit"] {
      cursor: pointer;
      ${MainBackColor}
      color: white;
      text-align: center;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &::placeholder {
      color: black;
    }
  }
`;

const SwitchAuth = styled.span`
  ${MainColor};
  cursor: pointer;
  margin-bottom: 50px;
  display: block;
  font-size: 18px;
  text-decoration: underline;
`;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await authServ.createUserWithEmailAndPassword(email, password);
      } else {
        await authServ.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <LogForm onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </LogForm>
      <SwitchAuth onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </SwitchAuth>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
    </>
  );
};

export default AuthForm;
