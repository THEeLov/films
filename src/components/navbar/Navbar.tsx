import { AppBar, CircularProgress } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { boolean } from "zod";

const Navbar = () => {

  const [isLoading, setIsLoading] = useState(false);

  const user = auth.currentUser;

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      // An error occurred while signing out.
      console.error("Error signing out: ", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <AppBar position="static" color="secondary">
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
        {user ? (
          <Button variant="contained" onClick={handleSignOut}>
            {isLoading ? <CircularProgress color="secondary" /> : "SIGN OUT"}
          </Button>
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
