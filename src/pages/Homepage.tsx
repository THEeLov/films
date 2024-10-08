import {
  Box,
  useTheme,
  Divider,
  Skeleton,
  LinearProgress,
  Typography,
} from "@mui/material";
import MovieCard from "../components/movies/MovieCard";
import { useFilms } from "../hooks/useFilms";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Homepage = () => {
  const theme = useTheme();

  const [params] = useSearchParams();
  const searchParam = params.get("search");
  const { data: movieList, isLoading, refetch } = useFilms(searchParam ?? "");

  useEffect(() => {
    if (searchParam) {
      console.log("workingsearch");
      refetch();
    }
  }, [searchParam, refetch]); 

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: theme.palette.primary.main,
        minHeight: "90vh"
      }}
    >
      {isLoading ? (
        <Box>
          <LinearProgress />
          {Array.from(new Array(20)).map((_, index) => (
            <Box key={index}>
              <Skeleton variant="rectangular" height={100} animation="wave" />
            </Box>
          ))}
        </Box>
      ) : (
        <>
          {movieList && movieList.length === 0 ? (
            <Box sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="body2" fontSize="1.5rem" color="white">
                No movies were found with name "{searchParam}"
              </Typography>
            </Box>
          ) : (
            movieList && movieList.map((movie) => (
              <Box key={movie.id}>
                <MovieCard movie={movie} />
                <Divider />
              </Box>
            ))
          )}
        </>
      )}
    </Box>
  );
};

export default Homepage;