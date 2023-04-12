import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Note from './components/Note';
import Form from './components/Form';

function App() {
    const sampleNote = {
        content: 'Start my to-do list',
        id: '5ee6395a-0ba2-4ab5-9230-de8325e5dd65',
        list: 'toDoNoteList',
    };

    const [notes, setNotes] = useState({ toDoNoteList: [sampleNote], completedNoteList: [] });

    function handleAddNote(newNote) {
        const updatedNotes = {
            toDoNoteList: [...notes.toDoNoteList, newNote],
            completedNoteList: [...notes.completedNoteList],
        };

        setNotes(updatedNotes);
    }

    function handleRemoveNote(noteList, noteIndex) {
        const updatedNotes = {
            toDoNoteList: [...notes.toDoNoteList],
            completedNoteList: [...notes.completedNoteList],
        };

        updatedNotes[noteList].splice(noteIndex, 1);
        setNotes(updatedNotes);
    }

    function handleOnDragEnd(result) {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const sourceList = source.droppableId;
        const destinationList = destination.droppableId;
        const droppedNote = notes[sourceList][source.index];

        const updatedNotes = {
            toDoNoteList: [...notes.toDoNoteList],
            completedNoteList: [...notes.completedNoteList],
        };

        updatedNotes[sourceList].splice(source.index, 1);
        updatedNotes[destinationList].splice(destination.index, 0, { ...droppedNote, list: destinationList });

        setNotes(updatedNotes);
    }

    return (
        <div className='App'>
            <header>
                <h1>Drag and drop sticky notes</h1>
            </header>

            <main>
                <Form addNote={handleAddNote} />

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className='listLayout'>
                        <Droppable droppableId='toDoNoteList'>
                            {(provided, snapshot) => (
                                <div className='listContainer'>
                                    <h2>To do:</h2>

                                    <ul
                                        className={snapshot.isDraggingOver ? 'toDoNoteList isBeingDraggedOver':'toDoNoteList'}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {provided.placeholder}
                                        {notes.toDoNoteList.map((note, index) => (
                                            <Note
                                                key={note.id}
                                                note={note}
                                                index={index}
                                                handleRemoveNote={handleRemoveNote}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId='completedNoteList'>
                            {(provided, snapshot) => (
                                <div className='listContainer'>
                                    <h2>Completed:</h2>

                                    <ul
                                        className={snapshot.isDraggingOver ? 'completedNoteList isBeingDraggedOver':'completedNoteList'}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {provided.placeholder}
                                        {notes.completedNoteList.map((note, index) => (
                                            <Note
                                                key={note.id}
                                                note={note}
                                                index={index}
                                                handleRemoveNote={handleRemoveNote}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </main>

            <footer>
                <p>
                    by <a href='https://www.daisybarrette.com/'>Daisy Barrette</a> on{' '}
                    <a href='https://github.com/daisybarrette/drag-and-drop-sticky-notes'>GitHub</a>
                </p>
            </footer>
        </div>
    );
}

export default App;
