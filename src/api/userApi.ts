import { doc, getDoc } from "firebase/firestore";
import { store } from "../config/firebase";

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
