import { Timestamp } from "firebase/firestore";

export type Movie = {
  id: string;
  title: string;
  description: string;
  name: string;
  imageUrl: string;
  sumOfRatings: number;
  totalRatings: number;
  averageRating: number;
  releaseDate: number;
  genre: Array<string>;
};

export type Comment = {
  id: string;
  comment: string;
  date: Timestamp;
};
