import React, { useState } from "react";
import {
  Typography,
  Box,
  Menu,
  Avatar,
  Tooltip,
  Toolbar,
  MenuItem,
  IconButton,
  AppBar,
  Hidden,
} from "@mui/material";
import { Link } from "react-router-dom";
import { navigateRoles } from "../../config/Constant";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(false);

  const userRole = localStorage.getItem("role").toUpperCase();

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.target);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar elevation={0} position="fixed">
      <Toolbar
        variant="dense"
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{userRole} DASHBOARD</Typography>
        <Hidden>
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                textTransform: "none",
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                textTransform: "none",
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link
                to={navigateRoles.LOGIN}
                onClick={() => {
                  localStorage.clear();
                }}
                style={{ textDecoration: "none" }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
