import React, { useEffect, useState } from "react";
import { Button, Card, CardColumns } from "react-bootstrap";
import { Popup } from 'reactjs-popup';
import NoteDetail from './NoteDetail';

const NoteContainer = ({ value }) => {
    const [noteData, setNoteData] = useState([]);

    useEffect(() => {
        setNoteData(value)
        console.log(noteData)
    }, [value])


    return (
        <>
            <CardColumns>
                {!noteData ? <p>Loading</p> : noteData.map((note) => (
                    <Card>
                        <Card.Body>
                            <Card.Title>{note.title}</Card.Title>
                            <Card.Text>
                                {note.content}
                            </Card.Text>
                        </Card.Body>
                        <Popup trigger={<Button variant="outline-success" modal={true}>Open Note</Button>}>
                            {close => (<div style={{ height: "100%", width: "100%", border: "0.5px solid black" }}><NoteDetail value={note} /><Button onClick={() => close()}>close</Button></div>)}
                        </Popup>
                    </Card>
                ))}



            </CardColumns>
        </>
    );
};

export default NoteContainer;
