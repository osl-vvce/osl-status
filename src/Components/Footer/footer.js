import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://osl.vvce.ac.in">
        OSL
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  box: {
    paddingBottom: theme.spacing(5),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box} mt={8}>
      <Copyright />
    </Box>
  );
};

export default Footer;
