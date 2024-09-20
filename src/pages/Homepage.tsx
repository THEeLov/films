import { Box, useTheme, Divider } from "@mui/material";
import MovieCard from "../components/cards/MovieCard";
import { useFilms } from "../hooks/useFilms";

const Homepage = () => {
  const theme = useTheme();
  const { movieList } = useFilms();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      {movieList.map((movie) => (
        <>
          <MovieCard movie={movie} />
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default Homepage;
