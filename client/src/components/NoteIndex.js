import React from "react";
import { ListGroup } from "react-bootstrap";
import { useChangeContext } from "../context/context";

const NoteIndex = ({ value, id }) => {
  const change = useChangeContext();

  const handleClick = (e) => {
    e.preventDefault();
    change({ type: "READ_NOTE", payload: id });
    console.log(id);
  };

  return (
    <ListGroup.Item
      action
      style={{ height: "50px" }}
      onClick={(e) => handleClick(e)}
    >
      {value}
    </ListGroup.Item>
  );
};

export default NoteIndex;
