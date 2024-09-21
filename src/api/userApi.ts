import { doc, getDoc } from "firebase/firestore";
import { store } from "../config/firebase";

/**
 * Fetch the rating submitted by a specific user for a specific movie.
 *
 * @param {string} movieId - The unique ID of the movie for which the user rating is being fetched.
 * @param {string} userId - The unique ID of the user whose rating is being retrieved.
 * @returns {Promise<number>} A promise that resolves to the user's rating for the specified movie.
 *                              If the user has not rated the movie, it resolves to 0.
 *
 */
export const getUserRating = async (
  movieId: string,
  userId: string
): Promise<number> => {
  const userRatingRef = doc(store, `movies/${movieId}/ratings/${userId}`);
  const userRatingSnap = await getDoc(userRatingRef);

  if (userRatingSnap.exists()) {
    const userRatingData = userRatingSnap.data();
    return userRatingData.rating;
  } else {
    return 0;
  }
};
