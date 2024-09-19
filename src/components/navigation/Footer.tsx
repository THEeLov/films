import {
  Box,
  Typography,
  Divider,
  Link,
  IconButton,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const theme = useTheme();

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
        color: theme.palette.secondary.main
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
        <IconButton color="inherit" aria-label="facebook">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="twitter">
          <TwitterIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="instagram">
          <InstagramIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="linkedin">
          <LinkedInIcon />
        </IconButton>
      </Box>

      <Typography variant="body2">
        Designed and Developed by Filip
      </Typography>
    </Box>
  );
};

export default Footer;
