import { createCookieSessionStorage } from "remix"
require("dotenv").config()

const secret = process.env.secret
if (!secret) {
  throw new Error("Secret is not defined in environment variable")
}

const domain = process.env.NODE_ENV === "production" ? "oslvvce.com" : ""

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      domain: domain,
      expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: [secret],
      secure: true,
    },
  })

export { getSession, commitSession, destroySession }
