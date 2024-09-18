import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import CommentCard from './CommentCard';
import { store } from '../config/firebase';

const Comments = ({ movieId }: { movieId: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const commentsRef = collection(store, `movies/${movieId}/comments`);
    const q = query(commentsRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const fetchedComments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {comments.length === 0 ? (
        <div>No comments yet.</div>
      ) : (
        comments.map(comment => (
          <CommentCard
            key={comment.id}
            text={comment.comment}
            date={comment.date.toDate().toLocaleDateString()}
          />
        ))
      )}
    </div>
  );
};

export default Comments;