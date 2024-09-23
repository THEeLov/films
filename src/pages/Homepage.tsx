import { Box, useTheme, Divider, Skeleton, LinearProgress } from "@mui/material";
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
        <Box>
          <LinearProgress />
          {Array.from(new Array(20)).map((_, index) => (
            <Box key={index}>
              <Skeleton variant="rectangular" height={100} animation="wave"/>
            </Box>
          ))}
        </Box>
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
