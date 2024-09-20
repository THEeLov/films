import { useEffect, useState } from "react";
import { Movie } from "../types";
import { doc, getDoc } from "firebase/firestore";
import { store } from "../config/firebase";

export const useFilm = (movieId: string | undefined) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilm = async () => {
      if (!movieId) {
        setError("Invalid Film ID");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(store, "movies", movieId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const movieData = docSnap.data() as Movie;
          setMovie({ ...movieData, id: docSnap.id });
        } else {
          setError("Film not found");
        }
      } catch (err) {
        setError("Failed to retrieve film data");
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [movieId]);

  return { movie, loading, error };
};
