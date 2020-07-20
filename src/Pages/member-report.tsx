import React, { useState, useEffect } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import Loader from "react-loader-spinner"
import { usernames } from "../Assets/data.json"
import NotFoundPage from "./404"

const MemberReportsPage: React.FC<RouteComponentProps> = ({ location }) => {
  interface UsernameList {
    [key: string]: string
  }

  let path = location.pathname
  let username = path.replace(/\/\w+\//, "")
  const usernameList: UsernameList = usernames
  let memberName = usernameList[username]

  let [loading, setLoading] = useState(true)
  const [report, setReport]: any = useState([])

  async function fetchUrl(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    setReport(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUrl(`https://polar-depths-36905.herokuapp.com/reports/${username}`)
  }, [username])

  if (username in usernames === false) loading = false

  interface Rows {
    id: string
    date: string
    osl: string
    past: string
    future: string
    fun: string
    reporter: string
  }

  function createData(
    id: string,
    date: string,
    osl: string,
    past: string,
    future: string,
    fun: string,
    reporter: string
  ) {
    return { id, date, osl, past, future, fun, reporter }
  }

  let rows: Rows[] = []
  if (Object.keys(report).length > 0) {
    Object.keys(report).forEach(date => {
      if (report[date]["timeStamp"]) {
        const { osl, past, future, fun, reporter } = report[date]
        rows.push(
          createData(
            new Date(date).toISOString(),
            date.substring(4, 15),
            osl[0].toUpperCase() + osl.slice(1),
            past.replace(/\n/g, "<br>"),
            future.replace(/\n/g, "<br>"),
            fun.replace(/\n/g, "<br>"),
            reporter
          )
        )
      }
    })
  }

  function sortRowsByDate(array: Rows[]) {
    return array.sort(function(a, b) {
      var x = a.id
      var y = b.id
      return x > y ? -1 : x < y ? 1 : 0
    })
  }

  rows = sortRowsByDate(rows)

  const isOdd = (even: string, odd: string, i: number) =>
    i % 2 === 1 ? even : odd

  return (
    <React.Fragment>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-50px"
          }}
        >
          <Loader type="Puff" color="#EEE" height={100} width={100} />
        </div>
      ) : username in usernames ? (
        <div className="bg-bgalt flex flex-col items-center px-6 lg:px-12">
          <h1 className="text-3xl lg:text-6xl uppercase mt-6">{memberName}</h1>
          <div className="my-4 lg:my-12 overflow-x-auto w-full flex lg:justify-center">
            <table className="text-default" style={{ minWidth: "1200px" }}>
              <thead className="bg-bg">
                <tr>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Visited OSL</th>
                  <th className="py-3 px-6">Last Week</th>
                  <th className="py-3 px-6">This Week</th>
                  <th className="py-3 px-6">Fun Stuff</th>
                  <th className="py-3 px-6">Reporter</th>
                </tr>
              </thead>
              <tbody className="bg-bgalt">
                {rows.map((row, i) => (
                  <tr
                    key={row.date}
                    className={`${isOdd("bg-tbody", "bg-tbodyalt", i)}`}
                  >
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base text-center">
                      {row.date}
                    </td>
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base text-center">
                      {row.osl}
                    </td>
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base">
                      <div dangerouslySetInnerHTML={{ __html: row.past }} />
                    </td>
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base">
                      <div dangerouslySetInnerHTML={{ __html: row.future }} />
                    </td>
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base">
                      <div dangerouslySetInnerHTML={{ __html: row.fun }} />
                    </td>
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base">
                      {row.reporter}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </React.Fragment>
  )
}

export default withRouter(MemberReportsPage)
