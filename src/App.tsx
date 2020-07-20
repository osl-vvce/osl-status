import React, { useState, useEffect } from "react"
import { Switch, Route } from "react-router-dom"

import "./tailwind.output.css"

import HomePage from "./Pages/home"
import ReportPage from "./Pages/latest-report"
import MembersPage from "./Pages/members"
import Navbar from "./Components/navbar"
import NotFoundPage from "./Pages/404"
import MemberReportsPage from "./Pages/member-report"
import Layout from "./Components/layout"

const App: React.FC = () => {
  const [theme, changeTheme] = useState(1)

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      const t = Number(localStorage.getItem("theme"))
      changeTheme(t)
    }
  }, [])

  const switchTheme = () => {
    const next = theme === 0 ? 1 : 0
    changeTheme(next)
    localStorage.setItem("theme", `${next}`)
  }
  return (
    <div className={`${theme ? "theme-dark" : "theme-light"}`}>
      <Navbar isDarkMode={theme} onChange={switchTheme} />
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/report" component={ReportPage} />
          <Route exact path="/members" component={MembersPage} />
          <Route path="/members" component={MemberReportsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </div>
  )
}

export default App
