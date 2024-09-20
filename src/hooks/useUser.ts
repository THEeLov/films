import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { getUserRating } from "../api/userApi";

export const useUserRating = (movieId: string, currentUser: User | null) => {
  return useQuery<number, Error>({
    queryKey: ["userRating", movieId, currentUser?.uid],
    queryFn: () => getUserRating(movieId, currentUser!.uid),
    enabled: !!currentUser && !!movieId,
    staleTime: 5 * 60 * 1000, // 5 minutes cache time
  });
};
