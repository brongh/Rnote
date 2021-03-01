import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { editOneNote } from "../api/axiosCall";
import { useAuthState, useNoteContext } from "../context/context";
import { decryptData, encryptData } from "../encryption/action";

const ParseContent = ({ value = [], onChange }) => {
  const [text, setText] = useState(value.join("\n"));

  const handleChange = (e) => {
    const value = e.target.value;

    setText(value);
    onChange(value.split("\n"));
  };

  return <textarea onChange={handleChange} value={text} />;
};

const NoteDetail = ({ value }) => {
  const authState = useAuthState();
  const MK = authState.mk;
  const user_id = authState.userDetails.user_id;
  const [details, setDetails] = useState({});
  const noteID = useNoteContext();
  const id = noteID.noteID;

  const { register, handleSubmit, control } = useForm();
  //   {
  //   defaultValue: {
  //     title: value.title || "",
  //     content: value.content || "new post",
  //   },
  // }
  const saveNote = async () => {
    // const title = getValues("title");
    // const content = getValues("content");
    // const res = await encryptData({ title, content }, MK);
    // const inputData = { user_id, ...res };
    // const response = await editOneNote(id, inputData);
    // console.error(response);
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
              {details.title}
            </input>
          </div>
          <label>Content</label>
          <Controller name="content" as={ParseContent} control={control} />
        </form>
      </div>
    </>
  );
};

export default NoteDetail;
