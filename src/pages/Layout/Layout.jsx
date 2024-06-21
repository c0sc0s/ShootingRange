import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NetworkPing } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { logout } from "../../apis/user";
import { Toaster } from "sonner";
import headerBg from "../../static/imgs/head_bg.png";
import bg from "./bg.jpg";
import ParticlesBg from "particles-bg";
import { useInitApp } from "../../hooks";
import useAppStore from "../../store";
import MyLoading from "../Loading";

const pages = [
  {
    name: "竞赛",
    path: "/",
  },
  {
    name: "排行榜",
    path: "/range",
  },
];

function ResponsiveAppBar() {
  useInitApp();
  const { title, loading } = useAppStore();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const clickHandler = (path) => {
    navigate(path);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {loading ? (
        <MyLoading />
      ) : (
        <div className="bg-[#061029] relative">
          <div
            className="h-screen w-screen bg-cover z-10"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div
              className="w-screen flex items-center bg-center bg-cover z-10 h-[100px]"
              style={{ backgroundImage: `url(${headerBg})` }}
            >
              <ParticlesBg
                type="cobweb"
                color="#17803D"
                num={60}
                bg={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  color: "#fff",
                  width: "30%",
                  height: "100vh",
                }}
              />
              <ParticlesBg
                type="cobweb"
                color="#17803D"
                num={60}
                bg={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 0,
                  color: "#fff",
                  width: "30%",
                  height: "100vh",
                }}
              />
              <Toaster position="top-center" />
              <div className="absolute left-5 -top-2 flex items-center justify-center">
                <NetworkPing sx={{ display: { xs: "none", md: "flex" } }} />
                <a href="/" className="mx-2 font-custom">
                  实训靶场
                </a>

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page.name}
                      onClick={() => clickHandler(page.path)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>
              </div>
              <h1 className="font-custom absolute right-[50%] translate-x-[50%] text-[2rem]">
                {title}
              </h1>
              <div className="absolute right-5 top-1">
                <IconButton size="small" onClick={handleOpenUserMenu}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "secondary.main",
                    }}
                  />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      logout();
                      // 清空 cookie
                      localStorage.removeItem("login");
                      navigate("/login");
                    }}
                  >
                    <Typography textAlign="center">退出登陆</Typography>
                  </MenuItem>
                </Menu>
              </div>
            </div>

            <Outlet></Outlet>
          </div>
        </div>
      )}
    </>
  );
}
export default ResponsiveAppBar;
