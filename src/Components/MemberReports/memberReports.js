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

const MemberReports = (props) => {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const [data, loading] = useFetch(
    "https://polar-depths-36905.herokuapp.com/reports"
  );

  let report = loading ? [] : data;
  console.log(report);

  let responsible = [
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

  let username = props.location.pathname.replace(/^\/\w+\//gm, "");

  let memberIdx = 0;

  for (memberIdx = 0; memberIdx < responsible.length; memberIdx++)
    if (
      responsible[memberIdx].replace(/[^a-zA-Z]/gm, "").toLowerCase() ===
      username
    )
      break;

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
  if (report.length > 0) {
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

    memberIdx++;
    let dates = report[0].dates;
    for (let i = 0; i < Object.keys(report[memberIdx]).length; i++) {
      let date = UTCDate(dates[i]);
      if (report[memberIdx][date]["timeStamp"]) {
        const {osl, past, future, fun, reporter} = report[memberIdx][date];
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
      } else {
        const {reporter} = report[memberIdx][date];
        rows.push(
          createData(
            date.substring(4, 15),
            "Not Yet Updated",
            "Not Yet Updated",
            "Not Yet Updated",
            "Not Yet Updated",
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
            {responsible[--memberIdx]}
          </Typography>
          <div className={classes.space} />
          <div className={classes.space} />
          <TableContainer component={Paper}>
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
                    <StyledTableCell>{row.osl}</StyledTableCell>
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
