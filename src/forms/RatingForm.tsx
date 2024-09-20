import { Box, Rating } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ratingSchema } from "../validationSchemas/movieForms";
import { z } from "zod";
import { useAuth } from "../contexts/AuthProvider";
import { useUserRating } from "../hooks/useUser";
import { submitRating } from "../services/ratingService";

type RatingSchema = z.infer<typeof ratingSchema>;

const RatingForm = ({ movieId }: { movieId: string }) => {
  const { currentUser } = useAuth();
  const { data: userRating = 0 } = useUserRating(movieId, currentUser);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: {},
  } = useForm<RatingSchema>({
    resolver: zodResolver(ratingSchema),
  });

  const ratingValue = watch("rating", userRating);

  const handleRatingChange = async (_: any, newValue: number | null) => {
    if (newValue !== null) {
      setValue("rating", newValue);
      await handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: RatingSchema) => {
    if (currentUser === null) {
      setValue("rating", 0);
      alert("Please sign in to rate a movie.");
      return;
    }

    try {
      await submitRating(movieId, currentUser.uid, data.rating);
    } catch (err) {
      console.error("Error updating movie and user's rating: ", err);
      alert("Failed to update rating. Please try again.");
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <Rating
        name="controlled-rating"
        size="large"
        value={ratingValue}
        onChange={handleRatingChange}
        precision={0.5}
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "white",
          },
        }}
      />
    </Box>
  );
};

export default RatingForm;
