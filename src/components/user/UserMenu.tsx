import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
    handleClose();
  };

  return (
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
          <Avatar src={currentUser.photoURL} alt="User Profile Picture" sx={{ width: 42, height: 42 }} />
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
        <MenuItem onClick={() => { handleClose(); navigate(`/user/${currentUser!.uid}`) }}>PROFILE</MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate(`/film-add`)}}>ADD FILMS</MenuItem>
        <MenuItem onClick={handleSignOut}>SIGN OUT</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;