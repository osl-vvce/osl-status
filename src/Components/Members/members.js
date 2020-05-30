import React from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Typography, Link} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {memberData} from "../../Data/data.json";

const MemberTable = (props) => {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

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

  function createData(member, usn, username) {
    return {member, usn, username};
  }

  const rows = [];

  Object.keys(memberData).map((member) =>
    rows.push(
      createData(
        member,
        memberData[member]["usn"],
        memberData[member]["username"]
      )
    )
  );

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
      <ThemeProvider theme={theme}>
        <Typography
          color="textPrimary"
          align="center"
          variant="h2"
          className="heading"
        >
          OSL MEMBERS
        </Typography>
        <div className={classes.space} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Member </StyledTableCell>
                <StyledTableCell align="right">USN </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.member}>
                  <StyledTableCell component="th" scope="row">
                    <Link color="inherit" href={`/members/${row.username}`}>
                      {row.member}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="right">
                    {row.usn}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </>
  );
};

export default MemberTable;
