import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { store } from "../config/firebase";

export const useComments = (movieId: string) => {
  const [comments, setComments] = useState<any[]>([]);
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
        setComments(fetchedComments);
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