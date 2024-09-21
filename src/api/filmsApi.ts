import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { Movie } from "../types";
import { storage, store } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { MovieCreateSchema } from "../types";

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
  comment: string,
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

/**
 * Upload an image file to Firebase Storage and return the download URL.
 *
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} The download URL of the uploaded image.
 * @throws Will throw an error if the upload fails.
 */
export const postFilmImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `movie-images/${file.name + uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
      },
    );
  });
};

/**
 * Create a new movie entry in Firestore after uploading the image.
 *
 * @param {MovieCreateSchema} data - The data to create a new movie.
 * @returns {Promise<void>} Resolves when the movie is successfully created.
 * @throws Will throw an error if the creation fails.
 */
export const postFilmCreate = async (
  data: MovieCreateSchema,
): Promise<void> => {
  let imageUrl = "";

  if (data.image && data.image.length > 0) {
    const file = data.image[0];
    imageUrl = await postFilmImage(file);
  }

  const movieId = uuidv4();

  const movie: Omit<Movie, "id"> = {
    title: data.title,
    description: data.description,
    name: data.title,
    imageUrl: imageUrl,
    sumOfRatings: 0,
    totalRatings: 0,
    averageRating: 0,
    releaseDate: data.releaseDate,
    genre: data.genre,
  };

  await setDoc(doc(store, "movies", movieId), movie);
};
