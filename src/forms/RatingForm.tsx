import { Box, Rating } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ratingSchema } from "../validationSchemas/movieForms";
import { doc, getDoc, serverTimestamp, writeBatch } from "firebase/firestore";
import { store } from "../config/firebase";
import { z } from "zod";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";

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

  const onSubmit = async (data: RatingSchema) => {
    if (currentUser === null) {
      alert("Please sign in before rating.");
      return;
    }

    const movieRef = doc(store, `movies/${movieId}`);
    const userRatingRef = doc(
      store,
      `movies/${movieId}/ratings/${currentUser.uid}`
    );
    const movieSnapshot = await getDoc(movieRef);
    const userRatingSnapshot = await getDoc(userRatingRef);

    const batch = writeBatch(store);

    if (!movieSnapshot.exists()) {
      throw new Error("Movie does not exist.");
    }

    const movieData = movieSnapshot.data();

    let newSumOfRatings = movieData.sumOfRatings;
    let newTotalRatings = movieData.totalRatings;

    // If user has already rated the movie, update the rating
    if (userRatingSnapshot.exists()) {
      const userRatingData = userRatingSnapshot.data();
      const oldRating = userRatingData.rating;
      newSumOfRatings = movieData.sumOfRatings - oldRating + data.rating;
    } else {
      // If it's a new rating, increase the totalRatings
      newTotalRatings = movieData.totalRatings + 1;
      newSumOfRatings = movieData.sumOfRatings + data.rating;
    }

    // Update movie document with new ratings data
    batch.update(movieRef, {
      sumOfRatings: newSumOfRatings,
      totalRatings: newTotalRatings,
      averageRating: (newSumOfRatings / newTotalRatings / 5) * 100,
    });

    // Set or update the user's rating in the subcollection
    batch.set(userRatingRef, {
      userId: currentUser.uid,
      rating: data.rating,
      timestamp: serverTimestamp(),
    });

    try {
      await batch.commit();
    } catch (err) {
      console.error("Error updating movie and user's rating: ", err);
      alert("Failed to update rating. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserRating = async () => {
      if (!currentUser) return;

      try {
        const userRatingRef = doc(store, `movies/${movieId}/ratings/${currentUser.uid}`);
        const userRatingSnap = await getDoc(userRatingRef);

        if (userRatingSnap.exists()) {
          const userRatingData = userRatingSnap.data();
          if (userRatingData && userRatingData.rating) {
            setValue("rating", userRatingData.rating);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRating();
  }, [currentUser, movieId, setValue]);

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
