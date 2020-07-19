import React, { useState, useEffect } from "react"
import Loader from "react-loader-spinner"
import { memberList } from "../Assets/data.json"

const ReportPage = () => {
  const [loading, setLoading] = useState(true)
  const [report, setReport]: any = useState([])
  const [dateInterval, setDateInterval] = useState({
    date: new Date(),
    nextDate: new Date()
  })

  async function fetchUrl(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    const dates = data[0]["dates"]
    const date = new Date(dates[dates.length - 1]["_seconds"] * 1000)
    setReport(data)
    setDateInterval({
      date: new Date(date.setDate(date.getDate() - 7)),
      nextDate: new Date(data[0]["timeStamp"]["_seconds"] * 1000)
    })
    setLoading(false)
  }

  useEffect(() => {
    fetchUrl("https://polar-depths-36905.herokuapp.com/reports")
  }, [])

  const { date, nextDate } = dateInterval

  memberList.sort()

  function createData(
    source: string,
    osl: string,
    past: string,
    future: string,
    reporter: string
  ) {
    return { source, osl, past, future, reporter }
  }

  function UTCDate(firebaseDateObject: any) {
    const date = new Date(firebaseDateObject["_seconds"] * 1000)
    let dateGMT = date.toUTCString()
    return (
      date.toString().substring(0, 15) +
      dateGMT.substring(16, 29) +
      "+0000 (Coordinated Universal Time)"
    )
  }

  const rows = []
  if (report.length > 0) {
    let dates = report[0].dates
    let latestDate: any = UTCDate(dates[dates.length - 1])
    for (let memberIdx = 1; memberIdx < memberList.length + 1; memberIdx++) {
      if (
        report[memberIdx][latestDate] &&
        report[memberIdx][latestDate]["timeStamp"]
      ) {
        const { osl, past, future, reporter } = report[memberIdx][latestDate]
        rows.push(
          createData(
            memberList[memberIdx - 1],
            osl[0].toUpperCase() + osl.slice(1),
            past.replace(/\n/g, "<br>"),
            future.replace(/\n/g, "<br>"),
            reporter
          )
        )
      }
    }
  }

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
      ) : (
        <div className="bg-bgalt flex flex-col items-center px-6 lg:px-12 min-h-screen-80">
          <h1 className="text-3xl lg:text-6xl uppercase mt-6">Report</h1>
          <h2 className="text-lg lg:text-2xl mt-2">{`${date
            .toDateString()
            .substring(4)} to ${nextDate.toDateString().substring(4)}`}</h2>
          <div className="my-4 lg:my-12 overflow-x-auto w-full flex lg:justify-center">
            <table className="text-default" style={{ minWidth: "1200px" }}>
              <thead className="bg-bg">
                <tr>
                  <th className="py-3 px-6">Member</th>
                  <th className="py-3 px-6">Visited OSL</th>
                  <th className="py-3 px-6">Last Week</th>
                  <th className="py-3 px-6">This Week</th>
                  <th className="py-3 px-6">Reporter</th>
                </tr>
              </thead>
              <tbody className="bg-bgalt">
                {rows.map((row, i) => (
                  <tr
                    key={row.source}
                    className={`${isOdd("bg-tbody", "bg-tbodyalt", i)}`}
                  >
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base">
                      {row.source}
                    </td>
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base">
                      {row.osl}
                    </td>
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base">
                      <div dangerouslySetInnerHTML={{ __html: row.past }} />
                    </td>
                    <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base">
                      <div dangerouslySetInnerHTML={{ __html: row.future }} />
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
      )}
    </React.Fragment>
  )
}

export default ReportPage
