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
import {memberList} from "../../Assets/data.json";

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
    for (let memberIdx = 1; memberIdx < memberList.length + 1; memberIdx++) {
      if (report[memberIdx][latestDate]["timeStamp"]) {
        const {osl, past, future, reporter} = report[memberIdx][latestDate];
        rows.push(
          createData(
            memberList[memberIdx - 1],
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
    container: {
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgb(81, 81, 81);",
        outline: "1px solid rgb(81, 81, 81);",
      },
    },
    table: {
      minWidth: 900,
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
          <TableContainer className={classes.container} component={Paper}>
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
                    <StyledTableCell align="center">{row.osl}</StyledTableCell>
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
