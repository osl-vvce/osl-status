import React from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full">
      <div className="flex bg-bg p-4 justify-between uppercase items-center">
        <Link to="/">
          <h1 className="lg:text-xl font-semibold">OSL Weekly</h1>
        </Link>
        <nav className="font-light">
          <a className="p-1 lg:mx-1 text-sm lg:text-base" href="/report">
            Report
          </a>
          <a className="p-1 lg:mx-1 text-sm lg:text-base" href="/members">
            Members
          </a>
        </nav>
      </div>
    </header>
  )
}
