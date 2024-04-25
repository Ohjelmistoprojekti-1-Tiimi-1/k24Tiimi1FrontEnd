import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [logins, setLogins] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      <Typography variant="h4">Enter login credentials:</Typography>
      <Box>
        <TextField
          value={logins.username}
          id="outlined-basic"
          label="username"
          placeholder="Username"
          variant="outlined"
        />
        <TextField
          value={logins.password}
          id="outlined-basic"
          label="password"
          placeholder="Password"
        />
      </Box>
    </>
  );
}
