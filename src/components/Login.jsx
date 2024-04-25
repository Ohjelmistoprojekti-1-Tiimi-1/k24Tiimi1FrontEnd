import { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";

export default function Login() {
  // objekti loginia varten
  // eslint-disable-next-line no-unused-vars
  const [logins, setLogins] = useState({
    username: "",
    password: "",
  });

  // objekti signuppia varten
  // eslint-disable-next-line no-unused-vars
  const [signups, setSignups] = useState([
    {
      newUsername: "",
      newPassword: "",
    },
  ]);

  const handleLoginClick = () => {
    if (logins.username && logins.password) {
      setLogins({ username: "", password: "" });
    }
  };

  // onClick signuppia varten
  const handleSignupClick = () => {
    if (signups.newUsername && signups.newPassword) {
      setSignups({ newUsername: "", newPassword: "" });
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ p: 2 }}>
        Login:
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
        <Button variant="contained" onClick={handleLoginClick}>
          Login
        </Button>
      </Stack>

      <Typography variant="h4" sx={{ p: 2 }}>
        Sign Up:
      </Typography>
      <Stack direction="row" sx={{ pl: 2 }} spacing={2}>
        <TextField
          value={signups.newUsername}
          id="outlined-basic"
          label="username"
          placeholder="Username"
          onChange={(e) =>
            setLogins({ ...signups, newUsername: e.target.value })
          }
        />
        <TextField
          value={signups.newPassword}
          id="outlined-basic"
          label="password"
          placeholder="Password"
          onChange={(e) =>
            setLogins({ ...signups, newPassword: e.target.value })
          }
        />
        <Button variant="contained" onClick={handleSignupClick}>
          Sign Up
        </Button>
      </Stack>
    </>
  );
}
