import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "Routes/Home";
import Auth from "Routes/Auth";
import Nav from "components/Nav";
import Profile from "Routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, updateUser }) => {
  return (
    <Router>
      {isLoggedIn && <Nav isLoggedIn={isLoggedIn} userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile
                userObj={userObj}
                isLoggedIn={isLoggedIn}
                updateUser={updateUser}
              />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
