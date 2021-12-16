import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  ConfirmAccount,
  Customer,
  Employee,
  Home,
  Login,
  NotFound,
  Report,
  Service,
  ServiceCategory,
  ServiceCustomer,
  UpdatePassword,
  UpdateService,
} from "./Pages";
import { Notifications, Header, Sidebar } from "./Components";
import { useDispatch, useSelector } from "react-redux";
import { authState$ } from "./redux/selectors";
import * as authActions from "./redux/actions/authActions";
import { Box } from "@mui/material";

const App = () => {
  const { data: user } = useSelector(authState$);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("adminToken") !== null) {
      dispatch(authActions.getUserByToken.getUserByTokenRequest());
    }
  }, [dispatch]);
  return (
    <Router>
      <Notifications />
      <Switch>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/confirm-account/:id"><ConfirmAccount/></Route>
        <Route exact path="/not-found">
          <NotFound />
        </Route>
        {user ? (
          <>
            <Header />
            <Box style={{ display: "flex" }}>
              <Sidebar />
              <Route exact path="/employee">
                <Employee />
              </Route>
              <Route exact path="/service">
                <Service />
              </Route>
              <Route exact path="/service-category">
                <ServiceCategory />
              </Route>
              <Route exact path="/report">
                <Report />
              </Route>
              <Route exact path="/customer">
                <Customer />
              </Route>
              <Route exact path="/update-password">
                <UpdatePassword />
              </Route>
              <Route exact path="/update-service/:id"><UpdateService/> </Route>
              <Route exact path="/service-customer">
                <ServiceCustomer />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Box>
          </>
        ) : (
          <Redirect to="/login" />
        )}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
