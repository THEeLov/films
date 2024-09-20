import { Box, useTheme, Divider, LinearProgress } from "@mui/material";
import MovieCard from "../components/cards/MovieCard";
import { useFilms } from "../hooks/useFilms";

const Homepage = () => {
  const theme = useTheme();
  const { data: movieList, isLoading } = useFilms();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        movieList &&
        movieList.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <Divider />
          </div>
        ))
      )}
    </Box>
  );
};

export default Homepage;
