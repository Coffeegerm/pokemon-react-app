import { useQuery } from "@tanstack/react-query";
import { pokedex } from "../services/pokedex";

const getPokemon = async ({offset, pageSize}) => {
  try {
    return (
      await pokedex.get("/pokemon", {
        params: {
          offset: offset,
          limit: pageSize,
        },
      })
    ).data;
  } catch (error) {
    throw error;
  }
};

export const usePokemon = ({ pageSize, offset } = {}) => {
  const { data, isLoading, isError } = useQuery(
    ["pokemon", pageSize, offset],
    () => getPokemon({ pageSize, offset })
  );
  return { count: data?.count, pokemon: data?.results, isLoading, isError };
};
