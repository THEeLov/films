import { Movie } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getFilms, getFilm } from "../api/filmsApi";

export const useFilm = (movieId: string | undefined) => {
  return useQuery<Movie, Error>({
    queryKey: ["movie", movieId],
    queryFn: () => getFilm(movieId!),
    enabled: !!movieId,
    retry: 1,
  });
};

export const useFilms = () => {
  return useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: getFilms,
  });
};
