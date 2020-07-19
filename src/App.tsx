import React from "react"
import { Switch, Route } from "react-router-dom"

import "./tailwind.output.css"

import HomePage from "./Pages/home"
import ReportPage from "./Pages/latest-report"
import MembersPage from "./Pages/members"
import Navbar from "./Components/navbar"
import NotFoundPage from "./Pages/404"
import MemberReportsPage from "./Pages/member-report"
import Footer from "./Components/footer"

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Footer>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/report" component={ReportPage} />
          <Route exact path="/members" component={MembersPage} />
          <Route path="/members" component={MemberReportsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Footer>
    </React.Fragment>
  )
}

export default App
