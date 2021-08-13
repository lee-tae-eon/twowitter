import { authServ, fbInstance } from "Fbase";
import React from "react";
import AuthForm from "components/AuthForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AuthSocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
`;

const AuthButton = styled.button`
  padding: 8px 13px;
  width: 180px;
  border-radius: 20px;
  border: none;
  background-color: skyblue;
  font-weight: 600;
  &:first-child {
    background-color: #98a699;
  }
`;

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "github") {
      provider = new fbInstance.auth.GithubAuthProvider();
    } else if (name === "google") {
      provider = new fbInstance.auth.GoogleAuthProvider();
    }
    const data = await authServ.signInWithPopup(provider);
  };

  return (
    <AuthContainer>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04aaff"}
        size="2x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <AuthSocialContainer>
        <AuthButton onClick={onSocialClick} name="github">
          Github로 로그인 <FontAwesomeIcon icon={faGithub} />
        </AuthButton>
        <AuthButton onClick={onSocialClick} name="google">
          Google로 로그인 <FontAwesomeIcon icon={faGoogle} />
        </AuthButton>
      </AuthSocialContainer>
    </AuthContainer>
  );
};

export default Auth;
