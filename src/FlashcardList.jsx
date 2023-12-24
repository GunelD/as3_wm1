import React, { useState, useEffect } from 'react';
import { fetchFlashCards, deleteFlashCard, updateFlashCard } from './API';
import FlashCard from './Flashcard';
import './FlashcardList.css';

const FlashcardList = () => {
  const [cards, setCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);

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

  const handleEditCard = (cardId) => {
    setEditingCardId(cardId);
  };

  const handleCancelEdit = () => {
    setEditingCardId(null);
  };

  const handleSaveEdit = async (cardId, editedData) => {
    try {
      await updateFlashCard(cardId, editedData);
      setCards(prevCards =>
        prevCards.map(card => (card.id === cardId ? { ...card, ...editedData } : card))
      );
    } catch (error) {
      console.error('Error updating card:', error);
    }

    setEditingCardId(null);
  };

  return (
    <div>
      {cards.map(card => (
        <FlashCard
          key={card.id}
          id={card.id}
          question={card.question}
          answer={card.answer}
          status={card.status}
          onDelete={() => handleDeleteCard(card.id)}
          onEdit={handleEditCard}
          onCancelEdit={handleCancelEdit}
          onSaveEdit={handleSaveEdit}
          isEditing={card.id === editingCardId}
        />
      ))}
    </div>
  );
};

export default FlashcardList;
