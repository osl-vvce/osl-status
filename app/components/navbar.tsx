import { Link } from "remix"
import { FaSun, FaMoon } from "react-icons/fa"

interface Props {
  isDarkMode: number
  onChange: () => void
}

const Navbar: React.FC<Props> = ({ isDarkMode, onChange }) => {
  return (
    <header className="w-full shadow-lg">
      <div className="flex bg-bg p-2 lg:p-4 justify-between uppercase items-center">
        <Link to="/">
          <h1 className="lg:text-xl font-semibold text-primary">OSL Weekly</h1>
        </Link>
        <nav className="font-light flex">
          <Link
            className="p-1 lg:mx-1 text-sm lg:text-base text-primary"
            to="/report"
          >
            Report
          </Link>
          <Link
            className="p-1 lg:mx-1 text-sm lg:text-base text-primary"
            to="/members"
          >
            Members
          </Link>
          <button
            onClick={onChange}
            className="text-primary p-1 lg:mx-1 focus:outline-none"
          >
            {isDarkMode === 1 ? (
              <FaMoon className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
            ) : (
              <FaSun className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
