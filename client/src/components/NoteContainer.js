import React, { useState } from "react";
import NoteDetail from "./NoteDetail";

const NoteContainer = () => {
  return (
    <div className="noteContainer">
      <div>edit new delete</div>
      <NoteDetail />
    </div>
  );
};

export default NoteContainer;
