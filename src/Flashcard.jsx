import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ id, question: initialQuestion, answer: initialAnswer, status: initialStatus, onDelete, onEdit, isEditing, onCancelEdit, onSaveEdit }) => {
  const [editedQuestion, setEditedQuestion] = useState(initialQuestion);
  const [editedAnswer, setEditedAnswer] = useState(initialAnswer);
  const [editedStatus, setEditedStatus] = useState(initialStatus);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e) => {
    if (!isEditing && e.target.tagName !== 'BUTTON') {
      setIsFlipped(!isFlipped);
    }
  };

  const handleSaveEdit = () => {
    onSaveEdit(id, { question: editedQuestion, answer: editedAnswer, status: editedStatus });
  };

  return (
    <div className={`flash-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-content">
      {isEditing ? (
  <>
    <textarea value={editedQuestion} onChange={(e) => setEditedQuestion(e.target.value)} className="editable-input" />
    <textarea value={editedAnswer} onChange={(e) => setEditedAnswer(e.target.value)} className="editable-input" />
    <textarea value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} className="editable-input" />
  </>
) : (
          <>
            <div className="side front">
              <strong>Question:</strong> {initialQuestion}
            </div>
            <div className="side back">
              <strong>Answer:</strong> {initialAnswer}
            </div>
            <div className="side status">
              <strong>Status:</strong> {initialStatus}
            </div>
          </>
        )}
      </div>
      <div className="actions">
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={onCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => onEdit(id)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
