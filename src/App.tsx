import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"

import "./tailwind.output.css"

import HomePage from "./Pages/home"
import ReportPage from "./Pages/latest-report"
import MembersPage from "./Pages/members"
import Navbar from "./Components/navbar"
import NotFoundPage from "./Pages/404"
import MemberReportsPage from "./Pages/member-report"
import Footer from "./Components/footer"

const App: React.FC = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(true)
  function handleThemeChange() {
    setDarkMode(!isDarkMode)
  }
  return (
    <div className={`${isDarkMode ? "theme-dark" : "theme-light"}`}>
      <Navbar isDarkMode={isDarkMode} onChange={handleThemeChange} />
      <Footer>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/report" component={ReportPage} />
          <Route exact path="/members" component={MembersPage} />
          <Route path="/members" component={MemberReportsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Footer>
    </div>
  )
}

export default App
