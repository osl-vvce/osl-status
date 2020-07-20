import React from "react"
import { Link } from "react-router-dom"
import { FaSun, FaMoon } from "react-icons/fa"

interface Props {
  isDarkMode: number
  onChange: () => void
}

const Navbar: React.FC<Props> = ({ isDarkMode, onChange }) => {
  return (
    <header className="fixed top-0 w-full shadow-lg">
      <div className="flex bg-bg p-2 lg:p-4 justify-between uppercase items-center">
        <Link to="/">
          <h1 className="lg:text-xl font-semibold text-primary">OSL Weekly</h1>
        </Link>
        <nav className="font-light flex">
          <a
            className="p-1 lg:mx-1 text-sm lg:text-base text-primary"
            href="/report"
          >
            Report
          </a>
          <a
            className="p-1 lg:mx-1 text-sm lg:text-base text-primary"
            href="/members"
          >
            Members
          </a>
          <button
            onClick={onChange}
            className="text-primary p-1 lg:mx-1 focus:outline-none"
          >
            {isDarkMode === 1 ? (
              <FaMoon className="w-6 h-6 fill-current" />
            ) : (
              <FaSun className="w-6 h-6 fill-current" />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
