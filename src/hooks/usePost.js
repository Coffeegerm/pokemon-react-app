import { useMutation, useQuery } from "@tanstack/react-query";
import { getSinglePost, updatePost } from "../services/roledex";

export const usePost = (id, { onMutateSuccess } = {}) => {
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
    isSuccess: isSuccessUpdate,
  } = useMutation(updatePost, {
    onSuccess: (data, variables) => {
      onMutateSuccess?.();
      console.info("usePost mutate onSuccess", { data, variables });
    },
    onError: (error, variables) => {
      console.error("usePost mutate onError", { error, variables });
    },
    onMutate: (variables) => {
      console.info("usePost onMutate", { variables });
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
