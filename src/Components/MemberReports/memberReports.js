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

  let usernames = {
    srikeerthi_s: "Srikeerthi S",
    sanjithpk: "Sanjith PK",
    sureshn: "Suresh N",
    pramod7: "Pramod K",
    shreevari: "Shreevari SP",
    sourabha: "Sourabha G",
    sandesh09: "Nagasandesh N",
    paulease: "Samantha Paul",
    clintondsza: "Aneesh Clinton D'Souza",
    umesh_ar: "Umesh A",
    soujanya: "Soujanya N",
    zshzero: "Ashwin Kumar",
    kunal_s: "Kunal S",
    derrylkevin: "Derryl Kevin Monis",
    pingport80: "Gaurav Purswani",
    neha_balaji: "Neha B",
    vibhaprasad: "Vibha Prasad",
    chandan_b_gowda: "Chandan B Gowda",
    nith: "Nithin Jaikar",
    swathi_kr: "Swathi Meghana K R",
    thusharkn: "Thushar K Nimbalkar",
    dr_clueless: "Avinash Arun",
    manju_m: "Manju M",
    nimeshm: "Nimesh M",
    chanchalvp: "Patil Chanchal Vinod",
    vaibhavds: "Vaibhav D S",
  };

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
