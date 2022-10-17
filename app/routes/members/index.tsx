import { Link, useLoaderData } from "remix"
import { BASEURL } from "~/utils/constants"

export async function loader() {
  let res = await fetch(`${BASEURL}/members`)
  return res.json()
}

interface Members {
  [key: string]: {
    telegramId: string
    username: string
    usn: string
    warningsLeft: string
  }
}

const Members: React.FC = () => {
  const members = useLoaderData() as Members

  const memberList = Object.keys(members).sort()

  const isOdd = (even: string, odd: string, i: number) =>
    i % 2 === 1 ? even : odd

  return (
    <div className="bg-bgalt flex flex-col items-center px-6 lg:px-12">
      <h1 className="text-3xl lg:text-6xl uppercase mt-6">Members</h1>
      <div className="my-6 lg:my-12">
        <table className="text-default">
          <thead className="bg-bg">
            <tr>
              <th className="py-3 px-6 text-left">Member</th>
              <th className="py-3 px-6 text-right">USN</th>
            </tr>
          </thead>
          <tbody className="bg-bgalt">
            {memberList.map((member, i) => {
              const details = members[member]
              return (
                <tr
                  key={i}
                  className={`${isOdd("bg-tbody", "bg-tbodyalt", i)}`}
                >
                  <td className="font-normal text-sm lg:text-base text-left">
                    <div className="py-2 px-5 lg:py-3 lg:px-6">
                      <Link to={`/members/${details.username}`}>{member}</Link>
                    </div>
                  </td>
                  <td className="font-normal text-sm lg:text-base text-right">
                    <div className="py-2 px-5 lg:py-3 lg:px-6 uppercase">
                      {details.usn}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Members
