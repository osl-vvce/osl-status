import { useLoaderData } from "remix"

export async function loader() {
  let res = await fetch("https://polar-depths-36905.herokuapp.com/info")
  return res.json()
}

export default function Index() {
  type Reporter = Record<string, string>
  type TimeStamp = {
    _seconds: number
    _nanoseconds: number
  }
  interface Rows {
    source: string
    reporter: string
  }

  const memberList = [
    "Srikeerthi S",
    "Sanjith PK",
    "Suresh N",
    "Pramod K",
    "Shreevari SP",
    "Sourabha G",
    "Nagasandesh N",
    "Samantha Paul",
    "Aneesh Clinton D'Souza",
    "Umesh A",
    "Soujanya N",
    "Ashwin Kumar",
    "Kunal S",
    "Derryl Kevin Monis",
    "Gaurav Purswani",
    "Neha B",
    "Vibha Prasad",
    "Chandan B Gowda",
    "Nithin Jaikar",
    "Swathi Meghana K R",
    "Thushar K Nimbalkar",
    "Avinash Arun",
    "Manju M",
    "Nimesh M",
    "Patil Chanchal Vinod",
    "Kratee Pareek",
    "Vaibhav D S",
    "Nidhi R",
    "Megha Subramanya"
  ]

  let response = useLoaderData()
  const [reporter, timeStamp] = response as [Reporter, TimeStamp]
  const date = new Date(timeStamp._seconds * 1000)

  function createData(source: string, reporter: string) {
    return { source, reporter }
  }

  const rows: Rows[] = []
  memberList.forEach(member => {
    if (reporter[member]) rows.push(createData(reporter[member], member))
  })

  const isOdd = (even: string, odd: string, i: number) =>
    i % 2 === 1 ? even : odd

  return (
    <div className="bg-bgalt flex flex-col items-center px-6 lg:px-12">
      <h1 className="text-3xl lg:text-6xl uppercase mt-6">Source Mappings</h1>
      <h2 className="text-lg lg:text-2xl mt-2">{`Last updated on  ${date
        .toDateString()
        .substring(4)}`}</h2>
      <div className="my-4 lg:my-12">
        <table className="text-default">
          <thead className="bg-bg">
            <tr>
              <th className="py-3 px-2 lg:py-3 lg:px-6 text-left">Source</th>
              <th className="py-3 px-2 lg:py-3 lg:px-6 text-right">Reporter</th>
            </tr>
          </thead>
          <tbody className="bg-bgalt">
            {rows.map((row, i) => (
              <tr
                key={row.source}
                className={`${isOdd("bg-tbody", "bg-tbodyalt", i)}`}
              >
                <td className="font-normal text-sm lg:text-base text-left">
                  <div className="py-2 px-2 lg:py-3 lg:px-6">{row.source}</div>
                </td>
                <td className="font-normal text-sm lg:text-base text-right">
                  <div className="py-1 px-2 lg:py-3 lg:px-6">
                    {row.reporter}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
