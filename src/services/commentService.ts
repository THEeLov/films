import { store } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Adds a new comment to a movie's comment collection in Firestore.
 *
 * @param {string} movieId - The ID of the movie to which the comment is being added.
 * @param {string} commentText - The content of the comment that is being added.
 * @throws Will throw an error if the operation fails to add the comment to Firestore.
 */
export const addComment = async (movieId: string, commentText: string) => {
  try {
    const commentsRef = collection(store, `movies/${movieId}/comments`);
    await addDoc(commentsRef, {
      comment: commentText,
      date: serverTimestamp(),
    });
  } catch (error) {
    throw new Error();
  }
};
