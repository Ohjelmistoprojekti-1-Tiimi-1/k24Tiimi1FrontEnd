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
    const [signups, setSignups] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

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

    const loginFetch = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_LOGIN, {
                mode: "cors",
                method: "post",
                headers: {
                  'Content-Type': 'application/json',
              },
                body: JSON.stringify(logins),
            });
            const token = response.headers.get('Authorization');
            document.cookie = `jwt=${token}`;
            const text = await response.json()
            setMessage(text.message)
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
                  'Content-Type': 'application/json'
              },
                body: JSON.stringify(signups),
            });
            const text = await response.json()
            setMessage(text.message)
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
            <Typography>{message}</Typography>
        </>
    );
}
