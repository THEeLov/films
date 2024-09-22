import { AppBar, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import React from "react";
import { AccountCircle } from "@mui/icons-material";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [_, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (navigateText: string) => {
    handleClose();
    navigate(navigateText);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        {/* LOGO */}
        <TheatersIcon />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          FILMS
        </Typography>

        {/* ACCOUNT */}
        <Box sx={{ flexGrow: 1 }} />
        {currentUser ? (
          <>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {currentUser?.photoURL ? (
                <Avatar
                  src={currentUser.photoURL}
                  alt="User Profile Picture"
                  sx={{ width: 42, height: 42
                   }}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => handleMenuClick(`/user/${currentUser.uid}`)}
              >
                PROFILE
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick(`/film-add`)}>
                ADD FILM
              </MenuItem>
              <MenuItem onClick={handleSignOut}>SIGN OUT</MenuItem>
            </Menu>
          </>
        ) : (
          <Button variant="outlined" component={Link} to={`/login`}>
            SIGN IN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
