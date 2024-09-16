import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";

const Navbar = () => {
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
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FILMS
          </Typography>

        {/* ACCOUNT */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
