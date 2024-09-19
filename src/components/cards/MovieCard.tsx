import { Box, Card, CardMedia, Typography, useTheme } from "@mui/material";
import { Movie } from "../../types";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "0",
        transition: "transform 0.2s ease",
        "&:hover": {
          cursor: "pointer",
          transform: "scale(0.995)",
        },
      }}
      onClick={() => navigate(`/film/${movie.id}`)} 
    >
      <CardMedia
        component="img"
        sx={{ width: "100px", height: "120px", objectFit: "cover" }}
        image={movie.imageUrl}
        alt={movie.title}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "calc(100% - 100px)",
          padding: "1rem",
          backgroundColor: theme.palette.primary.main,
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Typography
            component="h3"
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "white",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "hsla(0, 0%, 100%, 0.7)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <b>Release Date:</b> {movie.releaseDate}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "hsla(0, 0%, 100%, 0.7)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <b>Genre:</b> {movie.genre.join(" / ")}
          </Typography>
        </Box>
        <Typography
          component="div"
          sx={{
            padding: "0.5rem",
            backgroundColor: theme.palette.secondary.main,
            fontWeight: "bold",
            borderRadius: 1,
            fontSize: "2rem",
            whiteSpace: "nowrap",
          }}
        >
          {(movie.rating / 5) * 100}%{" "}
        </Typography>
      </Box>
    </Card>
  );
};

export default MovieCard;