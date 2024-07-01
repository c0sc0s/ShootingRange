import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NetworkPing } from "@mui/icons-material";
import useAppStore from "../../store";
import { logout } from "../../apis/user";

import headerBg from "../../static/imgs/head_bg.png";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    name: "竞赛",
    path: "/",
  },
  // {
  //   name: "排行榜",
  //   path: "/range",
  // },
  {
    name: "排行榜",
    path: "/rank",
  },
];

const Navigate = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute flex items-center justify-center top-1 left-10 ">
      <NetworkPing sx={{ display: { xs: "none", md: "flex" } }} />
      <Button
        color="info"
        onClick={() => navigate("/")}
        className="mx-2 text-white font-custom"
        variant="text"
      >
        实训靶场
      </Button>

      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.name}
            onClick={() => navigate(page.path)}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </div>
  );
};

const Title = ({ title }) => (
  <h1 className="font-custom absolute right-[50%] translate-x-[50%] text-[2rem]">
    {title}
  </h1>
);

const UserMenu = ({
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
}) => (
  <div className="absolute top-5 right-5 ">
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
          localStorage.removeItem("login");
          window.localStorage.href = "/login";
        }}
      >
        <Typography textAlign="center">退出登陆</Typography>
      </MenuItem>
    </Menu>
  </div>
);

const Header = () => {
  const { title } = useAppStore();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div
      className="flex items-center w-screen h-[150px] bg-center bg-cover"
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      <Navigate />
      <Title title={title} />
      <UserMenu
        handleCloseUserMenu={handleCloseUserMenu}
        anchorElUser={anchorElUser}
        handleOpenUserMenu={handleOpenUserMenu}
      />
    </div>
  );
};

export default Header;
