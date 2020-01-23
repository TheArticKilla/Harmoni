import React, { useEffect, useState } from "react";
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
import Contract from "./views/Contract/Contract";
import EventListTabs from "./views/EventList/EventListTabs";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import ForgotForm from "./views/ForgotPassword/ForgotForm";
import EditRidersForArtist from "./views/EditRidersForArtist/EditRidersForArtist";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import UserService from "./service/users";

export default () => {
  const [loggedIn, setLoggedIn] = React.useState(getCookie("token"));
  const [user, setUser] = useState({
    fullName: "",
    id: 0,
    roleID: 0
  });

  useEffect(() => {
    setLoggedIn(getCookie("token"));
    if (getCookie("token")) {
      UserService.getOneUser().then((user: any) => {
        setUser({fullName:user.username, id:user.id, roleID: user.roleID});
      });
    }
  }, [loggedIn]);

  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <HashRouter>
        <Navbar
          isAuth={AuthenticationService.getAuth}
          logFunc={setLoggedIn}
          loggedIn={loggedIn}
        />
        <Route
          exact
          path="/"
          render={(props: any) => (
            <Main {...props} isAuth={AuthenticationService.getAuth} />
          )}
        />
        <div style={{ marginTop: "70px" }}>
          <Route
            exact
            path="/event/:id"
            render={(props: any) => (
              <EventPage
                {...props}
                isAuth={AuthenticationService.getAuth}
                user={user}
              />
            )}
          />
          <Route
            exact
            path="/addEvent"
            render={(props: any) => (
              <Event
                {...props}
                isAuth={AuthenticationService.getAuth}
                edit={false}
              />
            )}
          />
          <Route
            exact
            path="/editEvent/:id"
            render={(props: any) => (
              <Event
                {...props}
                isAuth={AuthenticationService.getAuth}
                edit={true}
              />
            )}
          />
          <Route
            exact
            path="/signUp"
            render={(props: any) => (
              <SignUp {...props} isAuth={AuthenticationService.getAuth} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props: any) => (
              <Login
                {...props}
                isAuth={AuthenticationService.getAuth}
                logFunc={setLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props: any) => (
              <Profile {...props} isAuth={AuthenticationService.getAuth} />
            )}
          />
          <Route
            exact
            path="/contract/event/:eventId"
            render={(props: any) => (
              <Contract
                {...props}
                isAuth={AuthenticationService.getAuth}
                logFunc={setLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/eventUnarchived"
            render={(props: any) => (
              <EventListTabs
                {...props}
                isAuth={AuthenticationService.getAuth}
              />
            )}
          />
          <Route
            exact
            path="/forgotpassword/:token"
            render={(props: any) => <ForgotPassword {...props} />}
          />
        <Route
          exact
          path="/forgot"
          render={(props: any) => <ForgotForm {...props} />}
        />
        <Route
          exact
          path="/artist/editRider/:eventID/user/:userID"
          render={(props:any) =>
            <EditRidersForArtist {...props} isAuth={AuthenticationService.getAuth}  />}
          />
      </div>
      <Footer />
    </HashRouter>
    </SnackbarProvider>
  );
};
