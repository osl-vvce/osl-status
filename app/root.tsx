import { useEffect, useState } from "react"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  MetaFunction,
  useCatch
} from "remix"
import Footer from "./components/footer"
import Navbar from "./components/navbar"
import NotFoundPage from "./components/404"

import styles from "./tailwind.css"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => {
  return { title: "OSL Status" }
}

export default function App() {
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className={`min-h-screen flex flex-col ${
          theme ? "theme-dark" : "theme-light"
        }`}
      >
        <Navbar isDarkMode={theme} onChange={switchTheme} />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <html lang="en">
        <head>
          <title>Oh no...</title>
          <Links />
        </head>
        <body className="min-h-screen flex flex-col theme-dark">
          <NotFoundPage />
          <Scripts />
        </body>
      </html>
    )
  }
}
