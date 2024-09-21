import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { MovieWithRating } from "../../types";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserMovieCard = ({ movie }: { movie: MovieWithRating }) => {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: '12px',
        ":hover": {
          cursor: "pointer",
          transform: "scale(0.98)",
          opacity: 0.5,
          transition: "transform 0.2s, opacity 0.3s",
        },
      }}
      onClick={() => navigate(`/film/${movie.movieId}`)}
    >
      <CardMedia
        component="img"
        height="250px"
        width="200px"
        image={movie.imageUrl}
        alt={movie.title}
      />
      <CardContent sx={{backgroundColor: "inherit", height: "100%"}}>
        <Box
          width="200px"
          display="flex"
          height={100}
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography variant="h6" component="div">
            {movie.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Rating value={movie.rating} readOnly />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserMovieCard;
