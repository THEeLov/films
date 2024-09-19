export type Movie = {
  id: string;
  title: string;
  description: string;
  name: string;
  imageUrl: string;
  sumOfRatings: number,
  totalRatings: number,
  averageRating: number,
  releaseDate: number;
  genre: Array<string>;
}