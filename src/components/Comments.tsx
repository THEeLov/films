import CommentCard from "./cards/CommentCard";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useFilmComments } from "../hooks/useFilms";

const Comments = ({ movieId }: { movieId: string }) => {
  // Hook for getting all the comments for a movie
  const { comments, loading, error } = useFilmComments(movieId);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Box component="div">{error}</Box>;
  }

  return (
    <Box component="div">
      {comments && comments.length === 0 ? (
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
