import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/roledex";


export const usePosts = () => {
  const { data, isLoading, isError } = useQuery(["posts"], getPosts);
  return { data, isLoading, isError };
};
