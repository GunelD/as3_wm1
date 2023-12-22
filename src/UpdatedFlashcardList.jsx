import React, { useState, useEffect } from 'react';
import { fetchFlashCards, deleteFlashCard } from './API';
import FlashCard from './Flashcard';

const FlashcardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFlashCards();
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteFlashCard(cardId);
      setCards(cards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div>
      {cards.map(card => (
        <FlashCard
          key={card.id}
          question={card.question}
          answer={card.answer}
          status={card.status}
          onDelete={() => handleDeleteCard(card.id)}
        />
      ))}
    </div>
  );
};

export default FlashcardList;
