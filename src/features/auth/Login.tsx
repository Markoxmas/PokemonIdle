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
  setAuthNav,
  AuthNav,
  loginUser,
} from "./authSlice";
import Link from "@mui/material/Link";

export default function Login() {
  const dispatch = useAppDispatch();
  const { username, password } = useAppSelector((state) => state.auth);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
  };

  const handleSubmittingUserData = () => {
    if (username && password) {
      dispatch(loginUser({ username, password }));
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
          Login
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
              dispatch(setAuthNav(AuthNav.Register));
            }}
          >
            Register
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
