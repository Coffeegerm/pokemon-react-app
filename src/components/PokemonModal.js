import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { usePokemon } from "../hooks/usePokemon";

export const PokemonModal = ({ isOpen, onClose, pokemon }) => {
  const { data } = usePokemon({ pokemon });
  // console.log({ data });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{pokemon}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Types</Text>
          {data?.types?.map((t) => (
            <Text>{t.type.name}</Text>
          ))}

          <Text>Game Appearances</Text>
          {data?.game_indices?.map((t) => (
            <Text>{t.version.name}</Text>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
