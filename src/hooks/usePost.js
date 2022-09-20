import { useMutation, useQuery } from "@tanstack/react-query";
import { getSinglePost, updatePost } from "../services/roledex";

export const usePost = (id) => {
  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useQuery(["post", id], () => getSinglePost(id), {
    enabled: id !== undefined,
  });

  const {
    mutate,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
  } = useMutation(updatePost, {
    onSuccess: (data, variables) => {
      console.log("mutate onSuccess", { data, variables });
    },
    onError: (error, variables) => {
      console.log("mutate onError", { error, variables });
    },
    onMutate: (variables) => {
      console.log("mutate onMutate", { variables });
    },
  });

  return {
    post,
    isLoadingPost,
    isErrorPost,
    mutate,
    isLoadingUpdate,
    isErrorUpdate,
  };
};
