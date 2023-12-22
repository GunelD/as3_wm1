import React, { useState } from 'react';
import FlashCardList from './FlashcardList';
import CreateCardForm from './CreateCardForm';

const FlashCardsPage = () => {
  const [newCard, setNewCard] = useState(null);

  const handleCardCreate = (card) => {
    setNewCard(card);
  };

  return (
    <div>
      <h2>Flash Cards</h2>
      <CreateCardForm onCardCreate={handleCardCreate} />
      <FlashCardList newCard={newCard} />
    </div>
  );
};

export default FlashCardsPage;
