import React, { useEffect, useState } from "react";
import { Button, Card, CardColumns } from "react-bootstrap";
import { Popup } from "reactjs-popup";
import { useAuthState, useNoteContext } from "../context/context";
import { decryptData } from "../encryption/action";
import NoteDetail from "./NoteDetail";

const NoteContainer = ({ value }) => {
  const [noteData, setNoteData] = useState([]);
  const status = useNoteContext();
  const { mk } = useAuthState();
  const contentStyle = {
    background: "rgba(255,255,255,.8)",
    width: "80%",
  };

  useEffect(() => {
    console.table(value);
    if (value !== undefined) {
      const { title, content } = value[0];
      const encrypted = { title, content };

      const crack = async (encrypted, mk) => {
        console.log(encrypted);
        const data = await decryptData(encrypted, mk);
        console.log(data);
        if (data.title === undefined || data.content === undefined) {
          return setNoteData(value);
        }
        setNoteData(data);
        return data;
      };
      const data = crack(encrypted, mk);
    } else {
      setNoteData(value);
    }
  }, [status, value]);

  return (
    <>
      <CardColumns>
        <Card>
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
          noteData.map((note) => (
            <Card key={note.id}>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
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
                    <NoteDetail
                      preloadedValues={note}
                      key={note.id}
                      close={close}
                      type={"edit"}
                    />
                    <Button onClick={() => close()}>close</Button>
                  </div>
                )}
              </Popup>
            </Card>
          ))
        )}
      </CardColumns>
    </>
  );
};

export default NoteContainer;
