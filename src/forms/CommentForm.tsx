import {
  Box,
  TextField,
  Button,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { commentSchema } from "../validationSchemas/commentForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { store } from "../config/firebase";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { addTextFieldCommentStyle } from "../theme";
import { addDoc, collection, Timestamp } from "firebase/firestore";

type CommentSchema = z.infer<typeof commentSchema>;

const CommentForm = ({ movieId }: { movieId: string }) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentSchema) => {
    setLoading(true);
    try {
      const commentsRef = collection(store, `movies/${movieId}/comments`);
      await addDoc(commentsRef, {
        comment: data.comment,
        date: Timestamp.fromDate(new Date()),
      });
      
      reset();
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert('Failed to add comment. Please try again.');
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
                <AccountCircle />
              </InputAdornment>
            ),
          },
        }}
        variant="standard"
        sx={{...addTextFieldCommentStyle}}
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
        <Button type="reset" onClick={() => reset()} variant="contained">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CommentForm;
