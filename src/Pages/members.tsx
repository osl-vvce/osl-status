import React from "react"
import { memberData } from "../Assets/data.json"
import { Link } from "react-router-dom"

const MembersPage = () => {
  function createData(member: string, usn: string, username: string) {
    return { member, usn, username }
  }

  interface Rows {
    member: string
    usn: string
    username: string
  }

  const rows: Rows[] = Object.entries(memberData).map(([member, memberData]) =>
    createData(member, memberData.usn, memberData.username)
  )

  const isOdd = (even: string, odd: string, i: number) =>
    i % 2 === 1 ? even : odd

  return (
    <React.Fragment>
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
              {rows.map((row, i) => (
                <tr
                  key={row.member}
                  className={`${isOdd("bg-tbody", "bg-tbodyalt", i)}`}
                >
                  <td className="font-normal text-sm lg:text-base text-left">
                    <div className="py-2 px-5 lg:py-3 lg:px-6">
                      <Link to={`/members/${row.username}`}>{row.member}</Link>
                    </div>
                  </td>
                  <td className="font-normal text-sm lg:text-base text-right">
                    <div className="py-2 px-5 lg:py-3 lg:px-6">{row.usn}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MembersPage
