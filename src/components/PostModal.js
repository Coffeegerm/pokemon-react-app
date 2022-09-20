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
  Input,
} from "@chakra-ui/react";
import { usePost } from "../hooks/usePost";
import { useForm } from "react-hook-form";

export const PostModal = ({ isOpen, onClose, id }) => {
  const {
    isErrorPost,
    isErrorUpdate,
    isLoadingPost,
    isLoadingUpdate,
    mutate,
    post,
  } = usePost(id);


  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.info("onSubmit", { data, id });
    mutate({ ...data, id });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              defaultValue={post?.title}
              {...register("title")}
            />
            <Input
              placeholder="Body"
              defaultValue={post?.body}
              {...register("body")}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="purple" mr={3} type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
