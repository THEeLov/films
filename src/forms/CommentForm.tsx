import {
  Box,
  TextField,
  Button,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { commentSchema } from "../validationSchemas/movieForms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import { addTextFieldCommentStyle } from "../theme";
import { addComment } from "../services/commentService";

type CommentSchema = z.infer<typeof commentSchema>;

const CommentForm = ({ movieId }: { movieId: string }) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const { register, handleSubmit, reset } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentSchema) => {
    setLoading(true);
    try {
      await addComment(movieId, data.comment);
      reset();
    } catch (error) {
      alert("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      display="flex"
      flexDirection="column"
      width="100%"
      gap="1rem"
    >
      <TextField
        label="Add Comment"
        {...register("comment")}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CommentIcon sx={{ color: theme.palette.secondary.main }} />
              </InputAdornment>
            ),
          },
        }}
        variant="standard"
        sx={{ ...addTextFieldCommentStyle }}
      />

      <Box display="flex" gap="1rem" justifyContent="end">
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          }}
        >
          Comment
        </Button>
        <Button variant="contained" type="reset" onClick={() => reset()}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CommentForm;
