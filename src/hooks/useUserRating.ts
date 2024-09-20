import { doc, getDoc } from "firebase/firestore";
import { store } from "../config/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export const useUserRating = (movieId: string, currentUser: User | null) => {
  const [userRating, setUserRating] = useState<number>(0);

  useEffect(() => {
    const fetchUserRating = async () => {
      if (!currentUser) return;

      try {
        const userRatingRef = doc(
          store,
          `movies/${movieId}/ratings/${currentUser.uid}`
        );
        const userRatingSnap = await getDoc(userRatingRef);

        if (userRatingSnap.exists()) {
          const userRatingData = userRatingSnap.data();
          if (userRatingData && userRatingData.rating) {
            setUserRating(userRatingData.rating);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRating();
  }, [currentUser, movieId]);

  return { userRating };
};
