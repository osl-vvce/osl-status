import React from "react";
import PropTypes from "prop-types";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: "#0A0A0A",
  },
}));

function ElevationScroll(props) {
  const {children, window} = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function NavBar(props) {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Link href="/" color="inherit" underline="none">
                  OSL WEEKLY
                </Link>
              </Typography>
              <Button href="/report" color="inherit">
                Report
              </Button>
              <Button href="/members" color="inherit">
                Members
              </Button>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
      </React.Fragment>
    </ThemeProvider>
  );
}
