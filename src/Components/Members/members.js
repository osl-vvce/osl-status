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

const MemberTable = (props) => {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  let members = {
    "Srikeerthi S": {usn: "4VV17CS096", username: "srikeerthi_s"},
    "Sanjith PK": {usn: "4VV17CS082", username: "sanjithpk"},
    "Suresh N": {usn: "4VV17CS102", username: "sureshn"},
    "Pramod K": {usn: "4VV18CS060", username: "pramod7"},
    "Shreevari SP": {usn: "4VV16CS100", username: "shreevari"},
    "Sourabha G": {usn: "4VV18CS140", username: "sourabha"},
    "Nagasandesh N": {usn: "4VV18CS084", username: "sandesh09"},
    "Samantha Paul": {usn: "4VV17CS081", username: "paulease"},
    "Aneesh Clinton D'Souza": {usn: "4VV19CS010", username: "clintondsza"},
    "Umesh A": {usn: "4VV17CS107", username: "umesh_ar"},
    "Soujanya N": {usn: "4VV18CS138", username: "soujanya"},
    "Ashwin Kumar": {usn: "4VV16CS014", username: "zshzero"},
    "Kunal S": {usn: "4VV19CS073", username: "kunal_s"},
    "Derryl Kevin Monis": {usn: "4VV18CS034", username: "derrylkevin"},
    "Gaurav Purswani": {usn: "4VV18CS044", username: "pingport80"},
    "Neha B": {usn: "4VV19CS102", username: "neha_balaji"},
    "Vibha Prasad": {usn: "4VV17CS114", username: "vibhaprasad"},
    "Chandan B Gowda": {usn: "4VV19CS029", username: "chandan_b_gowda"},
    "Nithin Jaikar": {usn: "4VV19EE407", username: "nith"},
    "Swathi Meghana K R": {usn: "4VV19CS165", username: "swathi_kr"},
    "Thushar K Nimbalkar": {usn: "4VV19ME140", username: "thusharkn"},
    "Avinash Arun": {usn: "4VV19CS019", username: "dr_clueless"},
    "Manju M": {usn: "4VV18CS075", username: "manju_m"},
    "Nimesh M": {usn: "4VV18CS093", username: "nimeshm"},
    "Patil Chanchal Vinod": {usn: "4VV18CS101", username: "chanchalvp"},
    "Vaibhav D S": {usn: "4VV18CS165", username: "vaibhavds"},
  };

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

  Object.keys(members).map((member) =>
    rows.push(
      createData(member, members[member]["usn"], members[member]["username"])
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
