import React, { useState } from 'react';
import { createFlashCard } from './API';
import './CreateCardForm.css'; 

const CreateCardForm = ({ onCardCreate }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleCreateCard = async () => {
    try {
      const newCard = await createFlashCard({
        question,
        answer,
        status: 'Noted',
        lastModified: new Date().toISOString(),
      });

      onCardCreate(newCard);
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  return (
    <div className="create-card-form">
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="input-field"
      />
      <button onClick={handleCreateCard} className="create-button">
        Create Card
      </button>
    </div>
  );
};

export default CreateCardForm;
