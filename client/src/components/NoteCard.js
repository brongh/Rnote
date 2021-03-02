import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Popup from "reactjs-popup";
import { useAuthState } from "../context/context";
import { decryptData } from "../encryption/action";
import NoteDetail from "./NoteDetail";
import { cardStyle } from "./style";

const NoteCard = ({ value }) => {
  const authState = useAuthState();
  const MK = JSON.parse(authState.userDetails.mk);

  const [oneNote, setOneNote] = useState({});

  const contentStyle = {
    background: "rgba(255,255,255,.8)",
    width: "60%",
  };

  useEffect(() => {
    const { title, content } = value;
    const { id, user_id } = value;
    const encrypted = { title, content };
    const crack = async (encrypted, mk) => {
      const data = await decryptData(encrypted, mk);
      const nData = { id, user_id, ...data };
      setOneNote(nData);
      return nData;
    };
    crack(encrypted, MK);
  }, [value]);

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>{oneNote.title}</Card.Title>
        <Card.Text>{oneNote.content}</Card.Text>
      </Card.Body>
      <Popup
        trigger={<Button variant="outline-success">Open Note</Button>}
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
            <NoteDetail preloadedValues={oneNote} close={close} type={"edit"} />
            <Button onClick={() => close()}>close</Button>
          </div>
        )}
      </Popup>
    </Card>
  );
};

export default NoteCard;
