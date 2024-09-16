import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

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
        <Button variant="outlined" component={Link} to={`/login`}>
          SIGN IN
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
