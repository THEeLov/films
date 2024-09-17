import {
  Box,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Movie } from "../types";

const Homepage = () => {
  const theme = useTheme();
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const movieCollectionRef = collection(db, "movies");

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
        padding: "1rem",
        backgroundColor: theme.palette.primary.main,
      }}
    >
    
    </Box>
  );
};

export default Homepage;