import  { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { store } from '../config/firebase'; // Adjust the import based on your Firebase setup
import CommentCard from './CommentCard'; // Import your CommentCard component

const Comments = ({ movieId }: { movieId: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRef = collection(store, `movies/${movieId}/comments`);
        const q = query(commentsRef, orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

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
    };

    fetchComments();
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