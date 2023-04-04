import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Note from './components/Note';

function Form({ addNote }) {
    const [content, setContent] = useState('');

    const newId = uuid();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content) {
            return;
        }
        addNote({
            content: content,
            id: newId,
        });

        setContent('');
    };

    return (
        <form
            id='newNoteForm'
            onSubmit={handleSubmit}
        >
            <label htmlFor="newNoteInput">Add a new note: </label>
            <input
                id='newNoteInput'
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </form>
    );
}

function App() {
    const sampleNote = { content: 'Start my to-do list', id: '5ee6395a-0ba2-4ab5-9230-de8325e5dd65' };
    const [notes, setNotes] = useState([sampleNote]);

    function handleAddNote(newNote) {
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
    }

    function handleRemoveNote(noteIndex) {
        const updatedNotes = [...notes];
        updatedNotes.splice(noteIndex, 1);
        setNotes(updatedNotes);
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Todo List & Notes</h1>
            </header>

            <main>
                <Form addNote={handleAddNote} />

                <h2>To do:</h2>
                <DragDropContext onDragEnd={(result) => console.log('done dragging', result)}>
                    <Droppable droppableId='toDoNoteList'>
                        {(provided) => (
                            <ul
                                className='noteList'
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {provided.placeholder}
                                {notes.map((note, index) => (
                                    <Note
                                        key={note.id}
                                        note={note}
                                        index={index}
                                        handleRemoveNote={handleRemoveNote}
                                    />
                                ))}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </main>
        </div>
    );
}

export default App;
