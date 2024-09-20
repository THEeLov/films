import z from "zod";

export const commentSchema = z.object({
  comment: z.string().min(1),
});

export const ratingSchema = z.object({
  rating: z.coerce.number().min(0.1).max(5, "Max value is 5"),
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const movieCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  releaseDate: z.coerce.number().min(1, "Release date is required"),
  description: z.string().min(1, "Description is required"),
  genre: z.array(z.string()).min(1, "At least one genre is required"),
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});
