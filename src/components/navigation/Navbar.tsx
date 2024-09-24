import {
  AppBar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import LoginIcon from '@mui/icons-material/Login';
import UserMenu from "../UserMenu";
import SearchBar from "../SearchBar";

const Navbar = () => {
  const { currentUser } = useAuth();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

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
          <SearchBar />
        </Box>

        {/* ACCOUNT */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {currentUser ? (
            <UserMenu />
          ) : (
            <>
              {/* Conditionally render full button or icon based on screen size */}
              {isSmallScreen ? (
                <IconButton component={Link} to={`/login`} color="inherit">
                  <LoginIcon />
                </IconButton>
              ) : (
                <Button variant="outlined" component={Link} to={`/login`}>
                  SIGN IN
                </Button>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
