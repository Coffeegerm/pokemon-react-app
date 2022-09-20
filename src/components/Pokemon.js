import React, { useEffect, useState } from "react";
import { Grid, Center, Select, Text, Button, Stack } from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import { usePokemon } from "../hooks/usePokemon";
import { PokemonModal } from "./PokemonModal";

export const Pokemon = () => {
  // states
  const [total, setTotal] = useState(undefined);

  const [selectedPokemon, setSelectedPokemon] = useState(undefined);

  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 20,
      isDisabled: false,
      currentPage: 1,
    },
  });

  const { count, pokemon, isLoading, isError } = usePokemon({
    pageSize,
    offset,
  });

  useEffect(() => {
    if (count) {
      setTotal(count);
    }
  }, [count]);

  // handlers
  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  const handlePageSizeChange = (event) => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  const handleDisableClick = () => {
    setIsDisabled((oldState) => !oldState);
  };

  return (
    <>
      <Stack>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          isDisabled={isDisabled}
          onPageChange={handlePageChange}
        >
          <PaginationContainer
            align="center"
            justify="space-between"
            p={4}
            w="full"
          >
            <PaginationPrevious
              _hover={{
                bg: "yellow.400",
              }}
              bg="yellow.300"
            >
              <Text>Previous</Text>
            </PaginationPrevious>
            <PaginationPageGroup
              isInline
              align="center"
              separator={
                <PaginationSeparator
                  bg="blue.300"
                  fontSize="sm"
                  w={7}
                  jumpSize={11}
                />
              }
            >
              {pages.map((page) => (
                <PaginationPage
                  w={7}
                  bg="red.300"
                  key={`pagination_page_${page}`}
                  page={page}
                  fontSize="sm"
                  _hover={{
                    bg: "green.300",
                  }}
                  _current={{
                    bg: "green.300",
                    fontSize: "sm",
                    w: 7,
                  }}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext
              _hover={{
                bg: "yellow.400",
              }}
              bg="yellow.300"
            >
              <Text>Next</Text>
            </PaginationNext>
          </PaginationContainer>
        </Pagination>
        <Center w="full">
          <Button
            _hover={{
              bg: "purple.400",
            }}
            bg="purple.300"
            onClick={handleDisableClick}
          >
            Disable ON / OFF
          </Button>
          <Select ml={3} onChange={handlePageSizeChange} w={40}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Select>
        </Center>
        <Grid
          gap={3}
          mt={20}
          px={20}
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
        >
          {pokemon?.map(({ name }) => (
            <Center
              key={name}
              bg="green.100"
              p={4}
              onClick={() => {
                setSelectedPokemon(name);
              }}
            >
              <Text>{name}</Text>
            </Center>
          ))}
        </Grid>
      </Stack>
      <PokemonModal
        isOpen={selectedPokemon !== undefined}
        onClose={() => {
          setSelectedPokemon(undefined);
        }}
        pokemon={selectedPokemon}
      />
    </>
  );
};
