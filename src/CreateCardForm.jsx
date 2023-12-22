import React, { useState } from 'react';
import { createFlashCard } from './API';

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
    <div>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleCreateCard}>Create Card</button>
    </div>
  );
};

export default CreateCardForm;

