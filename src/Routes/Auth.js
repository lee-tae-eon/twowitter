import { authServ, fbInstance } from "Fbase";
import React from "react";
import AuthForm from "components/AuthForm";

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
    console.log(data);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="github">
          깃헙으로 로그인
        </button>
        <button onClick={onSocialClick} name="google">
          구글로 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
