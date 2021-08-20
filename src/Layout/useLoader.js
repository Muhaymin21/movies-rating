import React from "react";
import Loader from "./Loader";

export default function useLoader(initialState = false) {
    const [open, setOpen] = React.useState(initialState);

    const loaderOpenState = (newState = true) => {
        setOpen(newState);
    };

    function LoaderTag() {
        return open ? <Loader/> : "";
    }

    return [loaderOpenState, LoaderTag];
}
