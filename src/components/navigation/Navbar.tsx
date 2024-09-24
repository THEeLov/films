import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
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
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [_, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search results or homepage with query
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: "1rem"}}>
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TheatersIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FILMS
          </Typography>
        </Box>

        {/* Centered Search Bar */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              maxWidth: "400px",
              width: "100%"
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search ..."
              inputProps={{ "aria-label": "search movies" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        {/* ACCOUNT */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    sx={{ width: 42, height: 42 }}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
