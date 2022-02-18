import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "./store";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
/* Import Files */
import Cookies from "js-cookie";
import Navigation from "./Navigation";
import TestFileUpload from "./TestFileUpload";
import Register from "./components/Register";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Cards from "./components/Cards";
import Projects from "./components/Projects";
import Company from "./components/Company";

import history from "./history";

export default function Routes() {
  const user = useStoreState((state) => state.user.data);
  const getUser = useStoreActions((actions) => actions.user.getUser);
  const hasCookie = Boolean(Cookies.get("blueHatAuth"));

  useEffect(() => {
    getUser();
  }, []);

  /**
   *
   * This function holds our entire router together.
   * We default out user.onboardingStatus type to 'complete'
   * If the getUser request returns anything but complete we know to render onboarding
   * If we have no user at all. We know to render the register screen
   *
   * @returns boolean
   */
  const showOnboarding = () => {
    if (user && user.onboardingStatus !== "complete") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Navigation />
        <Switch>
          {!hasCookie && (
            <Route exact path="/" component={() => <Register />} />
          )}
          {/* {!showOnboarding() && [
            <Route
              exact
              path="/projects"
              component={() => <div>Projects</div>}
            />,
            <Route exact path="/upload" component={() => <TestFileUpload />} />,
          ]} */}
          {showOnboarding() && [
            <Route exact path="/onboarding" component={() => <Onboarding />} />,
            <Route path="/">
              <Redirect to="/onboarding" />
            </Route>,
          ]}
          <Route exact path="/" component={() => <Dashboard />} />,
          <Route exact path="/cards" component={() => <Cards />} />,
          <Route exact path="/company" component={() => <Company />} />,
          <Route exact path="/projects" component={() => <Projects />} />
          ,
          <Route
            exact
            path="/transactions"
            component={() => <Transactions />}
          />
          ,
          <Route exact path="/upload" component={() => <TestFileUpload />} />,
          {!showOnboarding() && [
            <Route path="/">
              <Redirect to="/" />
            </Route>,
          ]}
        </Switch>
      </div>
    </Router>
  );
}
