import React from "react";
import { Pokemon } from "./Pokemon";
import { Posts } from "./Posts";

const Render = {
  pokemon: Pokemon,
  posts: Posts,
};

export const Main = () => {
  const [page, setPage] = React.useState("pokemon");
  const Page = Render[page];
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "1.5rem",
        }}
      >
        <h1
          style={{
            padding: "1rem",
            borderColor: "lightcoral",
            borderWidth: "0.2rem",
            borderRadius: "1rem",
          }}
          onClick={() => {
            setPage("pokemon");
          }}
        >
          Pokemon
        </h1>
        <h1
          style={{
            padding: "1rem",
            borderColor: "lightcoral",
            borderWidth: "0.2rem",
            borderRadius: "1rem",
          }}
          onClick={() => {
            setPage("posts");
          }}
        >
          Posts
        </h1>
      </div>
      <Page />
    </div>
  );
};
