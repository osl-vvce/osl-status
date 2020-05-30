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
import {withRouter} from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {usernames} from "../../Data/data.json";

const MemberReports = (props) => {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  let path = props.location.pathname;
  let username = path.replace(/\/\w+\//, "");
  let memberName = usernames[username];

  const [date, loadingDate] = useFetch(
    "https://polar-depths-36905.herokuapp.com/dates"
  );
  const [data, loading] = useFetch(
    `https://polar-depths-36905.herokuapp.com/reports/${username}`
  );

  let report = loading ? [] : data;
  let dates = loadingDate ? [] : date;

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

  let rows = [];
  if (Object.keys(report).length > 0 && dates.length > 0) {
    function createData(date, osl, past, future, fun, reporter) {
      return {date, osl, past, future, fun, reporter};
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
    for (let i = 0; i < Object.keys(report).length; i++) {
      let date = UTCDate(dates[i]);
      if (report[date]["timeStamp"]) {
        const {osl, past, future, fun, reporter} = report[date];
        rows.push(
          createData(
            date.substring(4, 15),
            osl[0].toUpperCase() + osl.slice(1),
            past.replace(/\n/g, "<br>"),
            future.replace(/\n/g, "<br>"),
            fun.replace(/\n/g, "<br>"),
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
      minWidth: 1100,
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
      {loading && loadingDate ? (
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
            {memberName}
          </Typography>
          <div className={classes.space} />
          <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Date </StyledTableCell>
                  <StyledTableCell align="center">Visited OSL </StyledTableCell>
                  <StyledTableCell>Last Week </StyledTableCell>
                  <StyledTableCell>This Week </StyledTableCell>
                  <StyledTableCell>Fun Stuff </StyledTableCell>
                  <StyledTableCell align="center">Reporter </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.date}>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
                    <StyledTableCell align="center">{row.osl}</StyledTableCell>
                    <StyledTableCell>
                      <div dangerouslySetInnerHTML={{__html: row.past}} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <div dangerouslySetInnerHTML={{__html: row.future}} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <div dangerouslySetInnerHTML={{__html: row.fun}} />
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
};

export default withRouter(MemberReports);
