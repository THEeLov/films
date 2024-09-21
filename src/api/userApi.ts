import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, store } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserInfo, RegisterSchema } from "../types";

/**
 * Fetches the user profile from Firestore based on the provided user ID.
 *
 * @param {string} userId - The ID of the user whose profile is being fetched.
 * @returns {Promise<UserInfo>} A promise that resolves to the user's profile information.
 * @throws {Error} Throws an error if the user profile does not exist in Firestore.
 *
 */
export const getUser = async (userId: string): Promise<UserInfo> => {
  const docRef = doc(store, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data() } as UserInfo;
  } else {
    throw new Error("User profile does not exist");
  }
};
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

/**
 * Creates a new user profile document in Firestore upon user registration.
 *
 * @param {User} user - The user object containing information about the user.
 * @throws Will throw an error if the operation fails to set the document in Firestore.
 *
 */
export const posteUserCreate = async (userData: RegisterSchema) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );

  const user = userCredential.user;

  await setDoc(doc(store, "users", user.uid), {
    id: user.uid,
    displayName: "",
    email: user.email,
    profilePicUrl: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return user;
};
