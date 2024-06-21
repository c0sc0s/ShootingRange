// TODO： 样式重构
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/user";
import myImg from "../../static/imgs/1.jpg";

export default function SignInSide() {
  // 验证token,正确直接跳转到主页
  // React.useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("user");
    const password = data.get("password");

    if (!username || !password) {
      setMessage("账号密码不能为空");
      setOpen(true);
      return;
    }

    try {
      const { code } = await login({ username, password });
      if (code === "-2") {
        setMessage("账号密码错误");
        setOpen(true);
        return;
      }

      navigate("/");
      localStorage.setItem("login", true);
    } catch (e) {
      setMessage(e.message);
      setOpen(true);
      return;
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={1000}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${myImg})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "secondary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            variant="h5"
            sx={{
              mt: 3,
            }}
          >
            请登录
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="请输入账号"
              name="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="请输入密码"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Typography>登录</Typography>
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
