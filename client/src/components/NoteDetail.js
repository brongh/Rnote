import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { editOneNote } from "../api/axiosCall";
import { useAuthState, useNoteContext } from "../context/context";
import { decryptData, encryptData } from "../encryption/action";

const NoteDetail = ({ value }) => {
  const authState = useAuthState();
  const MK = authState.mk;
  const user_id = authState.userDetails.user_id;
  const [details, setDetails] = useState({});
  const noteID = useNoteContext();
  const id = noteID.noteID;

  const { register, handleSubmit, getValues } = useForm();
  const saveNote = async () => {
    const title = getValues("title");
    const content = getValues("content");
    const res = await encryptData({ title, content }, MK);
    const inputData = { user_id, ...res };
    const response = await editOneNote(id, inputData);
    console.error(response);
  };

  useEffect(() => {
    if (value !== undefined) {
      if (value.length > 0) {
        const output = [...value];
        const noteData = output.filter((word) => word.id === id);
        console.log(noteData[0]);
        setDetails(noteData[0]);
      }
    }
  }, [noteID]);
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(saveNote)}>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <Button variant="danger" style={{ margin: "2px 5px" }}>
              delete
            </Button>
            <Button variant="success" style={{ margin: "2px 5px" }}>
              edit
            </Button>
            <Button
              variant="primary"
              style={{ margin: "2px 5px" }}
              type="submit"
            >
              Save
            </Button>
          </div>
          <div>
            <input
              type="text"
              placeholder="title..."
              name="title"
              style={{ width: "100%" }}
              ref={register}
            >
              {details.title ? details.title : null}
            </input>
          </div>
          <div style={{ height: "100%" }}>
            <label for="content" />
            <textarea
              id="content"
              name="content"
              rows="40"
              style={{ width: "100%", height: "100%" }}
              ref={register}
            >
              {details.content ? details.content : null}
            </textarea>
          </div>
        </form>
      </div>
    </>
  );
};

export default NoteDetail;
