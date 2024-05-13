import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
  // objekti loginia varten
  // eslint-disable-next-line no-unused-vars
  const [logins, setLogins] = useState({
    username: "",
    password: "",
  });

  // objekti signuppia varten
  // eslint-disable-next-line no-unused-vars
  const [signups, setSignups] = useState({
    username: "",
    password: "",
  });

  // viesti joka tiedottaa, onnistuiko logini vai ei
  const [message, setMessage] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      setMessage("Signed in successfully!");
    }
  }, []);

  const handleLoginClick = () => {
    console.log("handleLoginClick");
    if (logins.username && logins.password) {
      loginFetch();
      setLogins({ username: "", password: "" });
    }
  };

  // onClick signuppia varten
  const handleSignupClick = () => {
    if (signups.username && signups.password) {
      signupFetch();
      setSignups({ username: "", password: "" });
    }
  };

  // logout-nappi ja toiminnallisuus
  function LogoutButton() {
    const handleLogoutClick = () => {
      setMessage("Signed out successfully.");

      sessionStorage.removeItem("jwt");
    };
    if (sessionStorage.getItem("jwt")) {
      return (
        <Button variant="contained" onClick={handleLogoutClick}>
          Log out
        </Button>
      );
    }
    return null;
  }

  // login-tietojen poisto
  function DeleteLogins() {
    const token = sessionStorage.getItem("jwt");
    const handleDeleteClick = () => {
      if (
        window.confirm(
          "Are you sure you want to delete your account credentials?"
        )
      ) {
        fetch(import.meta.env.VITE_API_DELCUSTOMER, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: token,
          },
        })
          .then((response) => {
            if (!response.ok)
              throw new Error(
                "Error in account deletion: " + response.statusText
              );
          })
          .then(setMessage("Account deleted successfully."))
          .catch((err) => console.error(err));
      }
    };

    if (sessionStorage.getItem("jwt")) {
      return (
        <Button variant="contained" onClick={handleDeleteClick}>
          Delete your account
        </Button>
      );
    }
    return null;
  }

  const loginFetch = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_LOGIN, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logins),
      });
      const token = response.headers.get("Authorization");
      sessionStorage.setItem("jwt", token);
      if (response.status == 200) {
        setMessage("Signed in successfully!");
      } else {
        setMessage("Wrong username or password.");
      }
    } catch (e) {
      setMessage(e.message);
    }
  };

  const signupFetch = async () => {
    try {
      let data = { username: logins.username, password: logins.password };
      const response = await fetch(import.meta.env.VITE_API_SIGNUP, {
        mode: "cors",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signups),
      });
      const text = await response.json();
      setMessage(text.message);
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ p: 2 }}>
        Sign in:
      </Typography>
      <Stack direction="row" sx={{ pl: 2 }} spacing={2}>
        <TextField
          value={logins.username}
          // id="outlined-basic"
          label="Username"
          placeholder="Username"
          onChange={(e) => setLogins({ ...logins, username: e.target.value })}
        />
        <TextField
          type={passwordVisible ? 'text' : 'password'}
          value={logins.password}
          // id="outlined-basic"
          label="Password"
          placeholder="Password"
          onChange={(e) => setLogins({ ...logins, password: e.target.value })}
        />
        <IconButton onClick={togglePasswordVisibility} edge="end">
        {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
        <Button variant="contained" onClick={handleLoginClick}>
          Sign in
        </Button>
      </Stack>

      <Typography variant="h4" sx={{ p: 2 }}>
        Sign up:
      </Typography>
      <Stack direction="row" sx={{ pl: 2 }} spacing={2}>
        <TextField
          value={signups.username}
          // id="outlined-basic"
          label="Username"
          placeholder="Username"
          onChange={(e) => setSignups({ ...signups, username: e.target.value })}
        />
        <TextField
          type={passwordVisible ? 'text' : 'password'}
          value={signups.password}
          // id="outlined-basic"
          label="Password"
          placeholder="Password"
          onChange={(e) => setSignups({ ...signups, password: e.target.value })}
        />
        <IconButton onClick={togglePasswordVisibility} edge="end">
        {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
        <Button variant="contained" onClick={handleSignupClick}>
          Sign up
        </Button>
      </Stack>
      <Typography variant="h6" sx={{ pl: 2 }}>
        {message}
      </Typography>
      <Stack direction="row" sx={{ p: 2 }}>
        <LogoutButton></LogoutButton>
        <DeleteLogins></DeleteLogins>
      </Stack>
    </>
  );
}
