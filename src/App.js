import React from "react";
import {Switch, Route} from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/navbar";
import HomePage from "./Pages/HomePage/homePage";
import MembersPage from "./Pages/MembersPage/memberspage";
import MemberReportsPage from "./Pages/MemberReportsPage/membersReportPage";
import LatestReportPage from "./Pages/LatestReportPage/latestReportPage";
import NotFoundPage from "./Pages/404Page/404page";
import Footer from "./Components/Footer/footer";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/members"
          render={(props) => <MembersPage {...props} />}
        />
        <Route exact path="/report" component={LatestReportPage} />
        <Route path="/members" component={MemberReportsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
