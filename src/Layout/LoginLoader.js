import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import "./css/LoginLoader.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#000",
  },
}));

export default function LoginLoader() {
  const classes = useStyles();
  return (
      <>
        <Backdrop className={classes.backdrop} open={true}>
          <div className="lds-ripple">
            <div/>
            <div/>
          </div>
        </Backdrop>
      </>
  );
}
