import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authServ } from "Fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authServ.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "파이어베이스 초기화중"
      )}
      <footer>&copy; twowitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
