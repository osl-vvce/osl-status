import React, {useState, useEffect} from "react";
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
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {memberList} from "../../Data/data.json";

export default function AssignmentTable() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const [loading, setLoading] = useState(true);
  const [reporter, setReporter] = useState([]);
  const [date, setDate] = useState("");

  async function fetchUrl(url) {
    const response = await fetch(url);
    const data = await response.json();
    setReporter(data[0]);
    setDate(new Date(data[1]["_seconds"] * 1000));
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl("https://polar-depths-36905.herokuapp.com/info");
  }, []);

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

  function createData(source, reporter) {
    return {source, reporter};
  }

  const rows = [];
  for (let i = 0; i < memberList.length; i++) {
    rows.push(createData(reporter[memberList[i]], memberList[i]));
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
            SOURCE MAPPINGS
          </Typography>
          <div className={classes.space} />
          <Typography color="textPrimary" align="center" variant="h5">
            {`Last updated on ${date.toDateString().substring(4)}`}
          </Typography>
          <div className={classes.space} />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Source </StyledTableCell>
                  <StyledTableCell align="right">Reporter</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.source}>
                    <StyledTableCell component="th" scope="row">
                      {row.source}
                    </StyledTableCell>
                    <StyledTableCell align="right">
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
