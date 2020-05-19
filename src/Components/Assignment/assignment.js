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

export default function AssignmentTable() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const [data, loading] = useFetch(
    "https://polar-depths-36905.herokuapp.com/info"
  );

  let reporter = loading ? [] : data[0];

  let date = loading ? "" : new Date(data[1]["_seconds"] * 1000);

  var responsible = [
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
    "Vaibhav D S",
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

  function createData(reporter, responsible) {
    return {reporter, responsible};
  }

  const rows = [];
  for (var i = 0; i < responsible.length; i++) {
    rows.push(createData(reporter[responsible[i]], responsible[i]));
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
                  <StyledTableRow key={row.reporter}>
                    <StyledTableCell component="th" scope="row">
                      {row.reporter}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.responsible}
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
