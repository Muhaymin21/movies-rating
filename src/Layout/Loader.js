import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import "./useLoader.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#000",
  },
}));

export default function Loader() {
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(true);

  //   const loaderOpenState = (newState = true) => {
  //     setOpen(newState);
  //   };

  //   function loaderCon() {
  //     return open ? (
  //       <div className="lds-ripple">
  //         <div />
  //         <div />
  //       </div>
  //     ) : (
  //       ""
  //     );
  //   }

  //   function Loader() {
  return (
    <>
      <Backdrop className={classes.backdrop} open={true}>
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      </Backdrop>
    </>
  );
  //   }

  //   return [Loader];
}
