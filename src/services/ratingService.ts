import { doc, getDoc, writeBatch, serverTimestamp } from "firebase/firestore";
import { store } from "../config/firebase";

/**
 * Submit or update a user's rating for a specific movie.
 * @param movieId - The ID of the movie.
 * @param userId - The ID of the user submitting the rating.
 * @param rating - The rating value (e.g., 1-5 stars).
 */
export const submitRating = async (
  movieId: string,
  userId: string,
  rating: number,
) => {
  const movieRef = doc(store, `movies/${movieId}`);
  const userRatingRef = doc(store, `movies/${movieId}/ratings/${userId}`);
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
    newSumOfRatings = movieData.sumOfRatings - oldRating + rating;
  } else {
    // If it's a new rating, increase the totalRatings
    newTotalRatings = movieData.totalRatings + 1;
    newSumOfRatings = movieData.sumOfRatings + rating;
  }

  // Update movie document with new ratings data
  batch.update(movieRef, {
    sumOfRatings: newSumOfRatings,
    totalRatings: newTotalRatings,
    averageRating: (newSumOfRatings / newTotalRatings / 5) * 100,
  });

  // Set or update the user's rating in the subcollection
  batch.set(userRatingRef, {
    userId: userId,
    rating: rating,
    timestamp: serverTimestamp(),
  });

  await batch.commit();
};
