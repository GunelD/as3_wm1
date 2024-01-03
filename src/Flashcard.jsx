import React, { useState } from 'react';
import './Flashcard.css';
import axios from 'axios';

const API_URL = 'http://localhost:3500';

const Flashcard = ({
  id,
  question: initialQuestion,
  answer: initialAnswer,
  status: initialStatus,
  lastModified,
  onDelete,
  onEdit,
  isEditing,
  onCancelEdit,
  onSaveEdit,
  onSelect,
  isSelected,
}) => {
  const [editedQuestion, setEditedQuestion] = useState(initialQuestion);
  const [editedAnswer, setEditedAnswer] = useState(initialAnswer);
  const [editedStatus, setEditedStatus] = useState(initialStatus);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e) => {
    if (!isEditing && e.target.tagName !== 'BUTTON' && !isSelected) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedData = {
        question: editedQuestion,
        answer: editedAnswer,
        status: editedStatus,
      };

      await axios.put(`${API_URL}/cards/${id}`, updatedData);

      onSaveEdit(id, updatedData);
    } catch (error) {
      console.error('Error updating card:', error);
    }

    setIsFlipped(false);
  };

  const handleSelect = () => {
    onSelect(id);
    setIsFlipped(false);
  };

  return (
    <div className={`flash-card ${isFlipped && !isEditing ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-content">
        {isEditing ? (
          <>
            <textarea value={editedQuestion} onChange={(e) => setEditedQuestion(e.target.value)} className="editable-input" />
            <textarea value={editedAnswer} onChange={(e) => setEditedAnswer(e.target.value)} className="editable-input" />
            <textarea value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} className="editable-input" />
          </>
        ) : (
          <>
            <div className="selection-checkbox">
              <input type="checkbox" checked={isSelected} onChange={handleSelect} />
            </div>
            <div className="side front">
              <strong>Question:</strong> {initialQuestion}
            </div>
            <div className="side back">
              <strong>Answer:</strong> {initialAnswer}
            </div>
            <div className="side status">
              <strong>Status:</strong> {initialStatus}
            </div>
            <div className="side last-modified">
              <strong>Last Modified:</strong> {new Date(lastModified).toLocaleString()}
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
