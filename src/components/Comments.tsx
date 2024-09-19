import CommentCard from "./cards/CommentCard";
import { Box } from "@mui/material";
import { useComments } from "../hooks/useComments";
import CircularProgress from '@mui/material/CircularProgress';

const Comments = ({ movieId }: { movieId: string }) => {

  // Hook for getting all the comments for a movie
  const { comments, loading, error } = useComments(movieId);

  if (loading) {
    return <CircularProgress/>
  }

  if (error) {
    return <Box component="div">{error}</Box>;
  }
  return (
    <Box component="div">
      {comments.length === 0 ? (
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
