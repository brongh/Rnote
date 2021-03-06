import React, { useState, useEffect } from "react";
import NoteContainer from "../components/NoteContainer";
import {
  useAuthState,
  useChangeContext,
  useNoteContext,
} from "../context/context";
import { getNotes, postNote } from "../api/axiosCall";
import { decryptData } from "../encryption/action";
// import { useAuthState } from "../context/context";
// import { encrypt, decrypt } from "../encryption/crypt";

const Main = () => {
  const authState = useAuthState();
  const id = authState.userDetails.user_id;
  const MK = authState.userDetails.mk;
  const status = useNoteContext();
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

        // setData(response);
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
  }, [isLoading, status]);

  return (
    <div className="notepage">
      <div style={{ height: "20px" }}></div>
      <div>
        <NoteContainer value={data} />
      </div>
    </div>
  );
};

export default Main;
