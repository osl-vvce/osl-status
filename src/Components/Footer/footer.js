import React from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://osl.vvce.ac.in">
        OSL VVCE
      </Link>{" "}
      {new Date().getFullYear()}
      <br />
      <Link
        color="inherit"
        href="https://www.facebook.com/oslvvce"
        style={{padding: 5}}
      >
        <FacebookIcon />
      </Link>
      <Link
        color="inherit"
        href="https://www.instagram.com/osl_vvce"
        style={{padding: 5}}
      >
        <InstagramIcon />
      </Link>
      <Link
        color="inherit"
        href="https://github.com/osl-vvce"
        style={{padding: 5}}
      >
        <GitHubIcon />
      </Link>
      <Link
        color="inherit"
        href="https://twitter.com/osl_vvce"
        style={{padding: 5}}
      >
        <TwitterIcon />
      </Link>
      <Link
        color="inherit"
        href="https://www.linkedin.com/company/osl-vvce"
        style={{padding: 5}}
      >
        <LinkedInIcon />
      </Link>
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "90vh",
  },
  footer: {
    padding: theme.spacing(2, 1),
    marginTop: "auto",
  },
}));

export default function Footer({children}) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {children}
        <footer className={classes.footer}>
          <hr />
          <Container>
            <Copyright />
          </Container>
        </footer>
      </div>
    </ThemeProvider>
  );
}
