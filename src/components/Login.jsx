import { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [logins, setLogins] = useState({
    username: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  const handleClick = () => {
    if (logins.username && logins.password) {
      setUsers([...users, logins]);
      setLogins({ username: "", password: "" });
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ p: 2 }}>
        Enter login credentials:
      </Typography>
      <Stack direction="row" sx={{ pl: 2 }} spacing={2}>
        <TextField
          value={logins.username}
          id="outlined-basic"
          label="username"
          placeholder="Username"
          onChange={(e) => setLogins({ ...logins, username: e.target.value })}
        />
        <TextField
          value={logins.password}
          id="outlined-basic"
          label="password"
          placeholder="Password"
          onChange={(e) => setLogins({ ...logins, password: e.target.value })}
        />
        <Button variant="contained" onClick={handleClick}>
          Login
        </Button>
      </Stack>
    </>
  );
}
