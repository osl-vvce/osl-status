import React from "react"
import Footer from "./footer"

const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-bg flex flex-col min-h-screen">
      {children}
      <hr />
      <Footer />
    </div>
  )
}

export default Layout
