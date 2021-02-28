import React, { useState, useEffect } from "react";
import NoteContainer from "../components/NoteContainer";
import { ListGroup } from "react-bootstrap";
import {
  useAuthState,
  useChangeContext,
  useNoteContext,
} from "../context/context";
import NoteIndexContainer from "../components/NoteIndexContainer";
import { getNotes, postNote } from "../api/axiosCall";
import NoteIndex from "../components/NoteIndex";
import NoteDetail from "../components/NoteDetail";
import { decryptData } from "../encryption/action";
// import { useAuthState } from "../context/context";
// import { encrypt, decrypt } from "../encryption/crypt";

const Main = () => {
  const authState = useAuthState();
  const id = authState.userDetails.user_id;
  const MK = authState.mk;
  const noteContext = useNoteContext();
  const note = noteContext.noteID;
  const change = useChangeContext();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const createNew = async (id) => {
      let res = await postNote(id);
      let noteID = res.data.id;
      change({ type: "READ_NOTE", payload: noteID });

      console.log(res);
    };
    createNew(id);
  };

  useEffect(() => {
    const grabAllNotes = async (id) => {
      const response = await getNotes(id);

      const res = response.data.notes_set;
      const crackCode = async (MK, details) => {
        const response = await decryptData(details, MK);

        // setDetails(response);
        return response;
      };
      let list = [];
      // for (let i = 0; i < res.length; i++) {
      //   const deciphered = await crackCode(MK, res[i]);
      //   console.log(deciphered);
      // }

      setData([...res]);
      setIsLoading(true);
    };
    grabAllNotes(id);
  }, [isLoading, note]);

  return (
    <div className="notepage">
      <div className="noteIndex">
        <ListGroup>
          <ListGroup.Item variant="danger" action onClick={(e) => handleAdd(e)}>
            <span style={{ fontWeight: "bold", color: "blue" }}>New Note</span>
          </ListGroup.Item>
          <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            {data
              ? data.map((data) => (
                  <NoteIndex key={data.id} value={data.title} id={data.id} />
                ))
              : null}
          </div>
        </ListGroup>
      </div>
      <div className="noteContainer">
        <NoteDetail value={data} />
      </div>
    </div>
  );
};

export default Main;
