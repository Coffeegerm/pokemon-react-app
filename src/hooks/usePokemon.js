import { useQuery } from "@tanstack/react-query";
import { pokedex } from "../services/pokedex";

const getPokemon = async ({ offset, pageSize, pokemon }) => {
  // throw new Error("error");
  let params = {};
  if (!pokemon) {
    params = {
      offset: offset,
      limit: pageSize,
    };
  }
  try {
    return (
      await pokedex.get(`/pokemon${pokemon ? `/${pokemon}` : ""}`, {
        params,
      })
    ).data;
  } catch (error) {
    throw error;
  }
};

export const usePokemon = ({ pageSize, offset, pokemon } = {}) => {
  const { data, isLoading, isError } = useQuery(
    ["pokemon", pageSize, offset, pokemon],
    () => getPokemon({ pageSize, offset, pokemon }),
    {
      onError: (error) => {
        window.alert(error.message);
      },
      onSuccess: (data) => {
        console.log("usePokemon success", { data });
      },
      onSettled: (data, error) => {
        console.log("usePokemon settled", { data, error });
      },
      staleTime: 240000
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
