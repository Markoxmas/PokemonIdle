import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setUsername,
  setPassword,
  setRepeatPassword,
  setAuthNav,
  AuthNav,
  registerUser,
} from "./authSlice";
import Link from "@mui/material/Link";

export default function Register() {
  const dispatch = useAppDispatch();
  const { username, password, repeatPassword } = useAppSelector(
    (state) => state.auth
  );

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setRepeatPassword(event.target.value));
  };

  const handleSubmittingUserData = () => {
    if (username && password === repeatPassword) {
      dispatch(registerUser({ username, password }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: 300, textAlign: "center", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            id="outlined-username"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            id="outlined-repeat-password-input"
            label="Repeat password"
            type="password"
            autoComplete="repeat-password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
          />
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Button variant="contained" onClick={handleSubmittingUserData}>
            Submit
          </Button>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              dispatch(setAuthNav(AuthNav.Login));
            }}
          >
            Login
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
