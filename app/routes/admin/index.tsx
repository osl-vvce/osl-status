import { json, LoaderFunction, redirect } from "remix"
import { commitSession, getSession } from "~/utils/sessions"

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"))

  if (!session.has("userId")) {
    return redirect("/admin/login")
  }

  const data = { error: session.get("error") }

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}

const Admin = () => {
  return <div>Admin</div>
}

export default Admin
