import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { Movie } from "../types";
import { store } from "../config/firebase";

/**
 * Fetch a specific movie by its ID from Firestore.
 *
 * @param {string} movieId - The unique ID of the movie to retrieve.
 * @returns {Promise<Movie>} A promise that resolves to a movie object containing movie details.
 * @throws Will throw an error if the movie document does not exist in Firestore.
 *
 */
export const getFilm = async (movieId: string): Promise<Movie> => {
  const docRef = doc(store, "movies", movieId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const movieData = docSnap.data() as Movie;
    return { ...movieData, id: docSnap.id };
  } else {
    throw new Error();
  }
};

/**
 * Fetch all movies from Firestore.
 *
 * @returns {Promise<Movie[]>} A promise that resolves to an array of movie objects containing movie details.
 *
 */
export const getFilms = async (): Promise<Movie[]> => {
  const movieCollectionRef = collection(store, "movies");
  const data = await getDocs(movieCollectionRef);
  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Movie[];
};

/**
 * Add a comment to a specific movie's comment subcollection in Firestore.
 *
 * @param {string} movieId - The ID of the movie to which the comment is being added.
 * @param {string} comment - The content of the comment to add.
 * @returns {Promise<void>} A promise that resolves once the comment is successfully added to Firestore.
 * @throws Will throw an error if the Firestore operation fails.
 *
 */
export const postFilmComment = async (
  movieId: string,
  comment: string
): Promise<void> => {
  try {
    const commentsRef = collection(store, `movies/${movieId}/comments`);
    await addDoc(commentsRef, {
      comment: comment,
      date: serverTimestamp(),
    });
  } catch (error) {
    throw new Error();
  }
};

/**
 * Submit or update a user's rating for a specific movie.
 * 
 * @param {string} movieId - The ID of the movie.
 * @param {string} userId - The ID of the user submitting the rating.
 * @param {number} rating - The rating value (e.g., 1-5 stars).
 */
export const postFilmRating = async (
  movieId: string,
  userId: string,
  rating: number
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
