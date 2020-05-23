import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import shuttle from "./404.png";
import "./404page.css";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "10vw 0",
    textAlign: "center",
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className="text">4</span>
      <img className="shuttle" src={shuttle} alt="404" />
      <span className="text">4</span>
      <p className="bottom-text">This page doesn't exist.</p>
    </div>
  );
};

export default NotFoundPage;
