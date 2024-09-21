import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { getUserRating, posteUserCreate } from "../api/userApi";
import { RegisterSchema, UserInfo } from '../types';
import { getUser } from "../api/userApi";

export const useUserRating = (movieId: string, currentUser: User | null) => {
  return useQuery<number, Error>({
    queryKey: ["userRating", movieId, currentUser?.uid],
    queryFn: () => getUserRating(movieId, currentUser!.uid),
    enabled: !!currentUser && !!movieId,
    staleTime: 5 * 60 * 1000, // 5 minutes cache time
  });
};

export const useUserProfile = (userId: string | undefined) => {
  return useQuery<UserInfo | null, Error>({
    queryKey: ['userProfile', userId],
    queryFn: () => getUser(userId!),
  });
};

export const useUserCreate = () => {
  return useMutation({
    mutationFn: (userData: RegisterSchema) => posteUserCreate(userData),
  });
};

