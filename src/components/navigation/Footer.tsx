import {
  Box,
  Typography,
  Divider,
  Link,
  IconButton,
  useTheme,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GitHub } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: theme.palette.secondary.main,
      }}
    >
      <Divider
        sx={{
          width: "100%",
          marginY: "1rem",
          backgroundColor: theme.palette.secondary.main,
        }}
      />

      <Typography variant="h6" gutterBottom>
        © {new Date().getFullYear()} FILMS
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginY: "1rem",
        }}
      >
        <Link href="/" color="inherit" underline="hover">
          Home
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginY: "1rem",
        }}
      >
        <IconButton color="inherit" aria-label="facebook" component="a" href="https://www.linkedin.com/in/filip-kozik-81b695303/">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="twitter" component="a" href="https://github.com/THEeLov">
          <GitHub  />
        </IconButton>
      </Box>

      <Typography variant="body2">Designed and Developed by Filip</Typography>
    </Box>
  );
};

export default Footer;
