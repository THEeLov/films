import { Timestamp } from "firebase/firestore";
import z from "zod";
import { movieCreateSchema } from "./validationSchemas/movieForms";
import { registerSchema } from "./validationSchemas/authForms";

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

export type MovieWithRating = Movie & Rating;

export type Comment = {
  id: string;
  comment: string;
  date: Timestamp;
};

export type UserInfo = {
  userId: string;
  email: string;
  displayName: string;
  profilePicUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type Rating = {
  movieId: string;
  rating: number;
  ratedAt: Timestamp;
}

export type MovieCreateSchema = z.infer<typeof movieCreateSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

