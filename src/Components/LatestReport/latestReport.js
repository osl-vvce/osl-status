import React from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {useFetch} from "../hooks";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function LatestReport() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const [data, loading] = useFetch(
    "https://polar-depths-36905.herokuapp.com/reports"
  );

  let report = loading ? [] : data;

  let dates = loading ? [0] : data[0]["dates"];
  let date = loading
    ? ""
    : new Date(dates[dates.length - 1]["_seconds"] * 1000);
  date = loading ? "" : new Date(date.setDate(date.getDate() - 7));
  let nextDate = loading
    ? ""
    : new Date(data[0]["timeStamp"]["_seconds"] * 1000);

  console.log(report);

  var responsible = [
    "Aneesh Clinton D'Souza",
    "Ashwin Kumar",
    "Avinash Arun",
    "Chandan B Gowda",
    "Derryl Kevin Monis",
    "Gaurav Purswani",
    "Kunal S",
    "Manju M",
    "Nagasandesh N",
    "Neha B",
    "Nimesh M",
    "Nithin Jaikar",
    "Patil Chanchal Vinod",
    "Pramod K",
    "Samantha Paul",
    "Sanjith PK",
    "Shreevari SP",
    "Soujanya N",
    "Sourabha G",
    "Srikeerthi S",
    "Suresh N",
    "Swathi Meghana K R",
    "Thushar K Nimbalkar",
    "Umesh A",
    "Vaibhav D S",
    "Vibha Prasad",
  ];

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  const rows = [];
  if (report.length > 0) {
    function createData(source, osl, past, future, reporter) {
      return {source, osl, past, future, reporter};
    }
    function UTCDate(date) {
      date = new Date(date["_seconds"] * 1000);
      let dateGMT = date.toUTCString();
      return (
        date.toString().substring(0, 15) +
        dateGMT.substring(16, 29) +
        "+0000 (Coordinated Universal Time)"
      );
    }
    let dates = report[0].dates;
    let latestDate = UTCDate(dates[dates.length - 1]);
    for (let memberIdx = 1; memberIdx < responsible.length + 1; memberIdx++) {
      if (report[memberIdx][latestDate]["timeStamp"]) {
        const {osl, past, future, reporter} = report[memberIdx][latestDate];
        rows.push(
          createData(
            responsible[memberIdx - 1],
            osl[0].toUpperCase() + osl.slice(1),
            past.replace(/\n/g, "<br>"),
            future.replace(/\n/g, "<br>"),
            reporter
          )
        );
      }
    }
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
    space: {
      marginBottom: 30,
    },
    spinner: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: "-50px",
      marginLeft: "-50px",
    },
  });

  const classes = useStyles();

  return (
    <>
      {loading ? (
        <Loader
          type="Puff"
          color="#EEE"
          height={100}
          width={100}
          className={classes.spinner}
        />
      ) : (
        <ThemeProvider theme={theme}>
          <Typography
            color="textPrimary"
            align="center"
            variant="h2"
            className="heading"
          >
            OSL WEEKLY REPORT
          </Typography>
          <div className={classes.space} />
          <Typography color="textPrimary" align="center" variant="h5">
            {`${date
              .toDateString()
              .substring(4)} to ${nextDate.toDateString().substring(4)}`}
          </Typography>
          <div className={classes.space} />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Member </StyledTableCell>
                  <StyledTableCell align="center">Visited OSL </StyledTableCell>
                  <StyledTableCell>Last Week </StyledTableCell>
                  <StyledTableCell>This Week </StyledTableCell>
                  <StyledTableCell align="center">Reporter </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.source}>
                    <StyledTableCell align="center">
                      {row.source}
                    </StyledTableCell>
                    <StyledTableCell>{row.osl}</StyledTableCell>
                    <StyledTableCell>
                      <div dangerouslySetInnerHTML={{__html: row.past}} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <div dangerouslySetInnerHTML={{__html: row.future}} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.reporter}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      )}
    </>
  );
}