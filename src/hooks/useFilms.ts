import { useEffect, useState } from "react";
import { Movie } from "../types";
import { collection, getDocs } from "firebase/firestore";
import { store } from "../config/firebase";

export const useFilms = () => {
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

  return { movieList };
};
