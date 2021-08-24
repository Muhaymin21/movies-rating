import {useParams} from "react-router-dom";

export default function Movie() {
      let { id } = useParams();
    return (<h1>Movie {id}</h1>);
}