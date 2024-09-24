import { Movie, Comment, UserAddComment } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getFilms,
  getFilm,
  postFilmComment,
  postFilmCreate,
} from "../api/filmsApi";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { store } from "../config/firebase";
import { MovieCreateSchema } from "../types";

export const useFilm = (movieId: string | undefined) => {
  return useQuery<Movie, Error>({
    queryKey: ["movie", movieId],
    queryFn: () => getFilm(movieId!),
    enabled: !!movieId,
    retry: 1,
  });
};

export const useFilms = (searchParam: string) => {
  return useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: () => getFilms(searchParam),
  });
};

export const useFilmAddComment = (movieId: string) => {
  return useMutation({
    mutationFn: (commentText: UserAddComment) =>
      postFilmComment(movieId, commentText),
  });
};

// Geting real-time data so i used different approach then Tanstack Query
export const useFilmComments = (movieId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const commentsRef = collection(store, `movies/${movieId}/comments`);
    const q = query(commentsRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const fetchedComments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments as Comment[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments: ", error);
        setError("Failed to fetch comments.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [movieId]);

  return { comments, loading, error };
};

export const useFilmCreate = () => {
  return useMutation({
    mutationFn: (data: MovieCreateSchema) => postFilmCreate(data),
  });
};
