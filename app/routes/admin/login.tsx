import { ActionFunction, Form, redirect, json, LoaderFunction } from "remix"
import { commitSession, getSession } from "~/utils/sessions"

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"))

  if (session.has("userId")) {
    return redirect("/admin")
  }

  const data = { error: session.get("error") }

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}

export let action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"))
  const form = await request.formData()
  const username = form.get("username")
  const password = form.get("password")

  const userId = username + " " + password

  if (userId == null) {
    session.flash("error", "Invalid username/password")

    // Redirect back to the login page with errors.
    return redirect("/admin/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    })
  }

  session.set("userId", userId)

  console.log(session.has("userId"))

  // Login succeeded, send them to the home page.
  return redirect("/admin", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}

const Login = () => (
  <div className="flex justify-center items-center min-h-[80vh]">
    <div className="w-full max-w-xs">
      <Form
        method="post"
        className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-default text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow bg-secondary appearance-none border rounded w-full py-2 px-3 text-default leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name="username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-default text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow bg-secondary appearance-none border rounded w-full py-2 px-3 text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex justify-start">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </Form>
    </div>
  </div>
)

export default Login
