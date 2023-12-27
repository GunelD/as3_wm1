import React, { useState, useEffect } from 'react';
import { fetchFlashCards, deleteFlashCard, updateFlashCard } from './API';
import FlashCard from './Flashcard';
import './FlashcardList.css';

const FlashcardList = () => {
  const [cards, setCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);
  const [searchText, setSearchText] = useState('');

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
      setCards(cards.filter((card) => card.id !== cardId));
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
      const updatedData = {
        ...editedData,
        lastModified: new Date().toISOString(),
      };

      await updateFlashCard(cardId, updatedData);

      setCards((prevCards) =>
        prevCards.map((card) => (card.id === cardId ? { ...card, ...updatedData } : card))
      );
    } catch (error) {
      console.error('Error updating card:', error);
    }

    setEditingCardId(null);
  };

  const filteredCards = cards.filter(
    (card) =>
      card.question.toLowerCase().includes(searchText.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchText.toLowerCase()) ||
      card.status.toLowerCase().includes(searchText.toLowerCase()) ||
      card.lastModified.toLocaleString().includes(searchText.toLocaleString())
  );

  return (
    <div className="container">
    <div className="search-input">
      <input
        type="text"
        placeholder="Search cards..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      </div>
      {filteredCards.map((card) => (
        <FlashCard
          key={card.id}
          id={card.id}
          question={card.question}
          answer={card.answer}
          status={card.status}
          lastModified={card.lastModified}
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
