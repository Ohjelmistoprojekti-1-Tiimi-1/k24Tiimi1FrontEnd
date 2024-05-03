import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import errorImage from "../assets/errorImage.jpg";


export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <Typography>
      <h1>Page not found</h1>
      <p>{error.data}</p>
      <img src={errorImage} />
    </Typography>
  );
}