import { ErrorBoundaryComponent, useLoaderData } from "remix"
import { BASEURL } from "~/utils/constants"

export async function loader() {
  let res = await fetch(`${BASEURL}/report`)
  return res.json()
}

const Report: React.FC = () => {
  const { dates, report } = useLoaderData()

  const members = Object.keys(report).sort()

  const isOdd = (even: string, odd: string, i: number) =>
    i % 2 === 1 ? even : odd

  return (
    <div className="bg-bgalt flex flex-col items-center px-6 lg:px-12 min-h-screen-80">
      <h1 className="text-3xl lg:text-6xl uppercase mt-6">Report</h1>
      <h2 className="text-lg lg:text-2xl mt-2">{`${dates.startDate} to ${dates.endDate}`}</h2>
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
            {members.map((member, i) => {
              const row = report[member]
              return (
                <tr
                  key={i}
                  className={`${isOdd("bg-tbody", "bg-tbodyalt", i)}`}
                >
                  <td className="font-normal py-2 px-2 lg:py-2 lg:px-3 text-sm lg:text-base text-center">
                    {member}
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
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="bg-bgalt flex flex-col items-center px-6 lg:px-12 min-h-screen-80">
      <h1 className="text-3xl lg:text-6xl uppercase mt-6">Report</h1>
      <p className="mt-2 text-3xl">No reports to show yet, come back later</p>
    </div>
  )
}

export default Report
