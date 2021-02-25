import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

const NoteIndex = () => {
  return (
    <div className="noteIndex">
      <ListGroup>
        <ListGroup.Item action href="#link1">
          Note 1
        </ListGroup.Item>
        <ListGroup.Item action href="#link2">
          Note 2
        </ListGroup.Item>
        <ListGroup.Item action href="#link3">
          Note 3
        </ListGroup.Item>
      </ListGroup>
      ,
    </div>
  );
};

export default NoteIndex;
