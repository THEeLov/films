import { Box, Button, Rating } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ratingSchema } from "../validationSchemas/movieForms";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { store } from "../config/firebase";
import { z } from "zod";
import { useAuth } from "../contexts/AuthProvider";

type RatingSchema = z.infer<typeof ratingSchema>;

const RatingForm = ({ movieId }: { movieId: string }) => {
  const { currentUser } = useAuth();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: {},
  } = useForm<RatingSchema>({
    resolver: zodResolver(ratingSchema),
  });

  const ratingValue = watch("rating", 0);

  const handleRatingChange = async (_: any, newValue: number | null) => {
    if (newValue !== null) {
      setValue("rating", newValue);
      await handleSubmit(onSubmit)();
    }
  };

  // Submit handler
  const onSubmit = async (data: RatingSchema) => {
    if (currentUser === null) {
      alert("Please log in first");
      return;
    }
    console.log("hello");
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
      <Rating
        name="controlled-rating"
        size="large"
        value={ratingValue}
        onChange={handleRatingChange}
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
