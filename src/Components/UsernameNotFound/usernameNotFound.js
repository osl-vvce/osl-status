import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import shuttle from "../../Assets/shuttle.png";
import "./usernameNotFound.css";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "5vw 0",
    textAlign: "center",
  },
}));

const UsernameNotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className="text">4</span>
      <img className="shuttle" src={shuttle} alt="404" />
      <span className="text">4</span>
      <p className="bottom-text">This user does not exist.</p>
    </div>
  );
};

export default UsernameNotFound;
