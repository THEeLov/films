import { Timestamp } from "firebase/firestore";
import z from "zod"
import { movieCreateSchema } from "./validationSchemas/movieForms";

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

export type MovieCreateSchema = z.infer<typeof movieCreateSchema>;
 
