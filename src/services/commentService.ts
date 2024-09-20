import { store } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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