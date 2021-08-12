import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authServ } from "Fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authServ.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  // console.log(authServ.currentUser);
  // setTimeout(() => console.log(authServ.currentUser), 2000);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "파이어베이스 초기화중"}
      <footer>&copy; twowitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
