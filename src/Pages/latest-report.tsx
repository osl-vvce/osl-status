import Loader from "react-loader-spinner"
import { useQuery, UseQueryOptions } from "react-query"
import { memberList } from "../Assets/data.json"

const ReportPage: React.FC = () => {
  const queryOptions: UseQueryOptions = {
    retry: 1,
    staleTime: 3600000,
  }

  const fetchLatestReport = async () => {
    const response = await fetch(
      "https://polar-depths-36905.herokuapp.com/reports"
    )
    return response.json()
  }

  const { isLoading, data } = useQuery<any>(
    "latestReport",
    fetchLatestReport,
    queryOptions
  )

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-50px",
          marginLeft: "-50px",
        }}
      >
        <Loader type="Puff" color="#EEE" height={100} width={100} />
        <div className="h-screen w-screen fkex" />
      </div>
    )
  }

  const dates = data[0]["dates"]
  let date = new Date(dates[dates.length - 1]["_seconds"] * 1000)
  date = new Date(date.setDate(date.getDate() - 7))
  const nextDate = new Date(data[0]["timeStamp"]["_seconds"] * 1000)

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
  if (data.length > 0) {
    let dates = data[0].dates
    let latestDate: any = UTCDate(dates[dates.length - 1])
    for (let memberIdx = 1; memberIdx < memberList.length + 1; memberIdx++) {
      if (
        data[memberIdx][latestDate] &&
        data[memberIdx][latestDate]["timeStamp"]
      ) {
        const { osl, past, future, reporter } = data[memberIdx][latestDate]
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
                <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base text-center">
                  {row.source}
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
                <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base text-center">
                  {row.reporter}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportPage
