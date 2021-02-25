import React from "react";
import NoteContainer from "../components/NoteContainer";
import NoteIndex from "../components/NoteIndex";

const Main = () => {
  return (
    <div className="notepage">
      <NoteIndex />
      <NoteContainer />
    </div>
  );
};

export default Main;
