import React from "react";
import { usePosts } from "../hooks/usePosts";
import { PostModal } from "./PostModal";

export const Posts = () => {
  const { data } = usePosts();
  const [id, setId] = React.useState(undefined);
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <h1 style={{ padding: "1rem", fontSize: "2rem" }}>Posts</h1>
        <div>
          {data?.map((post) => (
            <div
              key={post.id}
              style={{
                cursor: "pointer",
                borderColor: "lightgray",
                borderWidth: "0.2rem",
                padding: "1rem",
                borderRadius: "1rem",
                marginBottom: "0.5rem",
              }}
              onClick={() => {
                setId(post.id);
              }}
            >
              <h1>{post.title}</h1>
              <para>{post.body}</para>
            </div>
          ))}
        </div>
      </div>
      <PostModal
        isOpen={id !== undefined}
        onClose={() => {
          setId(undefined);
        }}
        id={id}
      />
    </>
  );
};
