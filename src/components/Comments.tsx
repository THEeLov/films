import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { store } from "../config/firebase";
import CommentCard from "./cards/CommentCard";
import { Box } from "@mui/material";

const Comments = ({ movieId }: { movieId: string }) => {
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
      } catch (error) {
        setError("Failed to fetch comments.");
        console.error("Error fetching comments: ", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [movieId]);

  return (
    <Box component="div">
      {loading ? (
        <Box component="div">Loading comments...</Box>
      ) : error ? (
        <Box component="div">{error}</Box>
      ) : comments && comments.length === 0 ? (
        <Box component="div">No comments yet.</Box>
      ) : (
        comments &&
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            text={comment.comment}
            date={comment.date}
          />
        ))
      )}
    </Box>
  );
};

export default Comments;
