import { Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { MovieWithRating } from "../../types";

const UserMovieCard = ({ movie }: { movie: MovieWithRating }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        width="20px"
        height="10px"
        image={movie.imageUrl}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Rating value={movie.rating} readOnly/>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserMovieCard;
