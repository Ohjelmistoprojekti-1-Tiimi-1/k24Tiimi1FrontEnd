import { useEffect, useState } from "react";
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
  const [signups, setSignups] = useState({
    username: "",
    password: "",
  });

  // viesti joka tiedottaa, onnistuiko logini vai ei
  const [message, setMessage] = useState("");

  // state, joka jäljittää, ollaanko logattu sisään vai ei sekä sitä, kuka on logannut
  const [loggedin, setLoggedin] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      setMessage("Login successful!");
      setLoggedin(true);
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
      setMessage("Logged out successfully.");
      setLoggedin(false);
      sessionStorage.removeItem("jwt")
    };
    if (loggedin) {
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
          "Are you sure you want to delete your customer credentials?"
        )
      ) {
        setLoggedin(false);
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
                "Error in customer deletion: " + response.statusText
              );
          })
          .then(setMessage("Login deleted successfully."))
          .catch((err) => console.error(err));
      }
    };

    if (loggedin) {
      return (
        <Button variant="contained" onClick={handleDeleteClick}>
          Delete Login Credentials
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
        setMessage("Login successful!");
        setLoggedin(true);
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
          value={signups.username}
          id="outlined-basic"
          label="username"
          placeholder="Username"
          onChange={(e) => setSignups({ ...signups, username: e.target.value })}
        />
        <TextField
          value={signups.password}
          id="outlined-basic"
          label="password"
          placeholder="Password"
          onChange={(e) => setSignups({ ...signups, password: e.target.value })}
        />
        <Button variant="contained" onClick={handleSignupClick}>
          Sign Up
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
