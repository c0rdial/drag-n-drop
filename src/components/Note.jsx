import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// @TODO add proptypes

function Note({ note, index, handleRemoveNote }) {
    return (
        <Draggable
            key={note.id}
            draggableId={note.id}
            index={index}
        >
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    index={index}
                    key={note.id}
                >
                    <button
                        className='removeNote'
                        onClick={() => handleRemoveNote(index)}
                    >
                        {'x'}
                    </button>
                    <div className='note'>{`${note.content}`}</div>
                </li>
            )}
        </Draggable>
    );
}

export default Note;
