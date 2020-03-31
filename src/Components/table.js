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
import {useFetch} from "./hooks";

export default function CustomizedTables() {
  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  const [data, loading] = useFetch("https://polar-depths-36905.herokuapp.com");

  let reporter = loading ? [] : data[0];

  let date = loading ? "" : data[1];

  var responsible = [
    "Shreevari SP",
    "Sanjith PK",
    "Srikeerthi S",
    "Umesh A",
    "Chandan B Gowda",
    "Swathi Meghana KR",
    "Thushar K Nimbalkar",
    "Kunal S",
    "Derryl Kevin Monis",
    "Patil Chanchal Vinod",
    "Gaurav Purswani",
    "Sourabha G.",
    "Nithin jaikar",
    "Manju M",
    "Avinash Arun",
    "Suresh N",
    "Samantha Paul",
    "Vibha Prasad",
    "Aneesh Clinton D'Souza",
    "Nagasandesh N",
    "Ashwin",
    "Pramod"
  ];

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  }))(TableRow);

  function createData(reporter, responsible) {
    return {reporter, responsible};
  }

  const rows = [];
  for (var i = 0; i < reporter.length; i++) {
    rows.push(createData(reporter[i], responsible[i]));
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 300
    },
    space: {
      marginBottom: 30
    }
  });

  const classes = useStyles();

  return (
    <>
      {loading ? (
        "Loading ... "
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
            {`Last Updated on ${date.substring(8, 10)}-${date.substring(
              5,
              7
            )}-${date.substring(0, 4)}`}
          </Typography>
          <div className={classes.space} />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Reporter </StyledTableCell>
                  <StyledTableCell align="right">Responsible</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
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
