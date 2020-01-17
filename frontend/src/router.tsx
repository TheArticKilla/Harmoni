import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/Navbar/Navbar";
import Event from "./views/Event/Event";
import SignUp from "./views/SignUp/SignUp";
import Login from "./views/Login/Login";
import Footer from "./components/Footer/Footer";
import Profile from "./views/Profile/Profile";
import EventPage from "./views/EventPage/EventPage";
import AuthenticationService from "./service/Authentication";
import Main from "./views/Main/Main";
import { HashRouter, Route } from "react-router-dom";
import getCookie from "./service/cookie";


const useStyles = makeStyles({
});

export default () => {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = React.useState(getCookie("token"));

  return (
    <HashRouter>
      <Navbar isAuth={AuthenticationService.getAuth} loggedIn={loggedIn}/>
      <Route exact path="/" render={(props:any) => <Main {...props} isAuth={AuthenticationService.getAuth} />} />
      <Route exact path="/event/:id" render={(props:any) => <EventPage {...props} isAuth={AuthenticationService.getAuth} />}/>
      <div style={{ marginTop: "150px" }}>
        <Route exact path="/addEvent" render={(props:any) => <Event {...props} isAuth={AuthenticationService.getAuth} />} />
        <Route exact path="/signUp" render={(props:any) => <SignUp {...props} isAuth={AuthenticationService.getAuth} />} />
        <Route exact path="/login" render={(props:any) => <Login {...props} isAuth={AuthenticationService.getAuth} logFunc={setLoggedIn}/>} />
        <Route exact path="/profile" render={(props:any) => <Profile {...props} isAuth={AuthenticationService.getAuth} logFunc={setLoggedIn} />}/>
      </div>
      <Footer />
    </HashRouter>
  );
};
