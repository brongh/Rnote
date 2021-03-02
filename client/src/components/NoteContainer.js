import React, { useEffect, useState } from "react";
import { Button, Card, CardColumns } from "react-bootstrap";
import { Popup } from "reactjs-popup";
import { useAuthState, useNoteContext } from "../context/context";
import { decryptData } from "../encryption/action";
import NoteCard from "./NoteCard";
import NoteDetail from "./NoteDetail";
import { cardStyle, createNoteStyle } from "./style";

const NoteContainer = ({ value }) => {
  const [noteData, setNoteData] = useState([]);
  const status = useNoteContext();

  const contentStyle = {
    background: "rgba(255,255,255,.8)",
    width: "80%",
  };

  useEffect(() => {
    setNoteData(value);
  }, [status, value]);

  return (
    <>
      <CardColumns>
        <Card style={createNoteStyle}>
          <Card.Body>
            <Card.Title>Create New Note</Card.Title>
            <Popup
              trigger={<Button variant="success">Create</Button>}
              modal={true}
              overlayStyle={{ background: "rgba(255,255,255,0.5" }}
              contentStyle={contentStyle}
            >
              {(close) => (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    border: "0.5px solid black",
                    background: "rgba(0,0,0,0.8)",
                  }}
                >
                  <NoteDetail close={close} type={"post"} />
                  <Button onClick={() => close()}>close</Button>
                </div>
              )}
            </Popup>
          </Card.Body>
        </Card>
        {!noteData ? (
          <p>Loading</p>
        ) : (
          noteData.map((note) => <NoteCard key={note.id} value={note} />)
        )}
      </CardColumns>
    </>
  );
};

export default NoteContainer;
