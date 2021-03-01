import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { deleteOneNote, editOneNote, postNote } from "../api/axiosCall";
import {
  useAuthState,
  useChangeContext,
  useNoteContext,
} from "../context/context";
import { encryptData } from "../encryption/action";

const NoteDetail = ({ preloadedValues, close, type }) => {
  const authState = useAuthState();
  const MK = JSON.parse(authState.userDetails.mk);
  // const [details, setDetails] = useState({});
  const status = useNoteContext();
  const change = useChangeContext();

  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues,
  });

  const deleteNote = async (id) => {
    let res = await deleteOneNote(id);
    change({ type: "STATUS_CHANGE", payload: 5 });
    console.log(res);
    close();
  };

  const createNote = async (data) => {
    const enData = encryptData(data, MK);
    const { user_id } = authState.userDetails;
    const input = { user_id, ...enData };
    const res = await postNote(input);
    change({ type: "STATUS_CHANGE", payload: 5 });
    console.log(status);
    console.log(res);
    return res;
  };

  const saveNote = async () => {
    // const title = getValues("title");
    // const content = getValues("content");
    // const res = await encryptData({ title, content }, MK);
    // const inputData = { user_id, ...res };
    // const response = await editOneNote(id, inputData);
    // console.error(response);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
        }}
      >
        <form onSubmit={handleSubmit(type === "post" ? createNote : saveNote)}>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",

              marginBottom: "10px",
            }}
          >
            {type === "post" ? null : (
              <>
                <Button
                  variant="danger"
                  style={{ margin: "2px 5px" }}
                  onClick={() => deleteNote(preloadedValues.id)}
                >
                  delete
                </Button>
                <Button variant="success" style={{ margin: "2px 5px" }}>
                  edit
                </Button>
              </>
            )}

            <Button
              variant="primary"
              style={{ margin: "2px 5px" }}
              type="submit"
            >
              {type === "post" ? "Create" : "Save"}
            </Button>
          </div>
          <div>
            <label style={{ color: "white", fontWeight: "bold" }}>Title</label>
            <input
              type="text"
              placeholder="title..."
              name="title"
              style={{ width: "100%" }}
              ref={register}
            ></input>
          </div>
          <label style={{ color: "white", fontWeight: "bold" }}>Content</label>
          <textarea
            ref={register}
            style={{ width: "100%", height: "250px" }}
            name="content"
            placeholder="note content..."
            type="text"
          />
        </form>
      </div>
    </>
  );
};

export default NoteDetail;
