import { Box, useTheme, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { store } from "../config/firebase";
import { Movie } from "../types";
import MovieCard from "../components/MovieCard";

const Homepage = () => {
  const theme = useTheme();
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const movieCollectionRef = collection(store, "movies");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getDocs(movieCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Movie[];
        setMovieList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, []);

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
          <Divider variant="middle" />
        </>
      ))}
    </Box>
  );
};

export default Homepage;
