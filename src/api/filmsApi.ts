import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Movie } from "../types";
import { store } from "../config/firebase";

export const getFilm = async (movieId: string): Promise<Movie> =>  {
  const docRef = doc(store, "movies", movieId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const movieData = docSnap.data() as Movie;
    return { ...movieData, id: docSnap.id };
  } else {
    throw new Error();
  }
}

export const getFilms = async (): Promise<Movie[]> => {
  const movieCollectionRef = collection(store, "movies");
  const data = await getDocs(movieCollectionRef);
  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Movie[];
}
