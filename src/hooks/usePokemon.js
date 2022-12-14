import { useQuery } from "@tanstack/react-query";
import { pokedex } from "../services/pokedex";

const getPokemon = async ({ offset, pageSize, pokemon }) => {
  // throw new Error("error");
  let params = {};
  // only want to fetch the pokemon minus the offset and pageSize
  let url = "/pokemon";
  if (pokemon) {
    url += `/${pokemon}`;
  } else {
    params = {
      offset,
      limit: pageSize,
    };
  }
  try {
    return (
      await pokedex.get(url, {
        params,
      })
    ).data;
  } catch (error) {
    throw error;
  }
};

export const usePokemon = ({ pageSize, offset, pokemon } = {}) => {
  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isPaused,
    isLoading,
    isLoadingError,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
    fetchStatus,
  } = useQuery(
    ["pokemon", pageSize, offset, pokemon],
    () => getPokemon({ pageSize, offset, pokemon }),
    {
      onError: (error) => {
        console.error("usePokemon error", error);
        window.alert(error.message);
      },
      onSuccess: (data) => {
        console.info("usePokemon success", { data });
      },
      onSettled: (data, error) => {
        console.info("usePokemon settled", { data, error });
      },
      staleTime: 240000,
      // transform data from return of query function
      // does not affect what is stored in cache
      select: (data) => {
        return data;
      },
    }
  );
  return {
    count: data?.count,
    pokemon: data?.results,
    data,
    isLoading,
    isError,
  };
};
