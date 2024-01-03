import React, { useState, useEffect } from 'react';
import { fetchFlashCards, deleteFlashCard, updateFlashCard, fetchStatuses } from './API';
import FlashCard from './Flashcard';
import './FlashcardList.css';

const FlashcardList = () => {
  const [cards, setCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchFlashCards(sortOption);
        setCards(data);
        setLoading(false);

        const statusData = await fetchStatuses();
        setStatuses(statusData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOption]);

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteFlashCard(cardId);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      setSelectedCardIds((prevSelectedIds) => prevSelectedIds.filter((id) => id !== cardId));
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

  const handleCardSelect = (cardId) => {
    setSelectedCardIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(cardId)) {
        return prevSelectedIds.filter((id) => id !== cardId);
      } else {
        return [...prevSelectedIds, cardId];
      }
    });
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const compareByLastModified = (a, b) => {
    const dateA = new Date(a.lastModified);
    const dateB = new Date(b.lastModified);

    return sortOption === 'lastModifiedNewToOld' ? dateB - dateA : dateA - dateB;
  };

  const sortedCards = sortOption
    ? [...cards].sort(compareByLastModified)
    : cards;

  const filteredCards = sortedCards
    .filter(
      (card) =>
        card.question.toLowerCase().includes(searchText.toLowerCase()) ||
        card.answer.toLowerCase().includes(searchText.toLowerCase()) ||
        card.status.toLowerCase().includes(searchText.toLowerCase()) ||
        card.lastModified.toLocaleString().includes(searchText.toLocaleString())
    )
    .filter((card) => (statusFilter ? card.status.toLowerCase() === statusFilter : true));

  const handleSendSelectedCards = async () => {
    try {
      const selectedCards = cards.filter((card) => selectedCardIds.includes(card.id));

      const emailSubject = 'Flashcard Details';
      const emailBody = selectedCards
        .map(
          (card) =>
            `ID: ${card.id}\nQuestion: ${card.question}\nAnswer: ${card.answer}\nStatus: ${card.status}\nLast Modified: ${new Date(
              card.lastModified
            ).toLocaleString()}\n\n`
        )
        .join('\n');

      const mailtoURL = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      window.location.href = mailtoURL;
    } catch (error) {
      console.error('Error sending selected cards:', error);
    }
  };

  return (
    <div className="container">
      <div className="search-filter-container">
        <div className="search-input">
          <label>Search for Cards: </label>
          <input
            type="text"
            placeholder="Search cards..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="filter-input">
          <label>Choose Status: </label>
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="">All</option>
            {statuses.map((status) => (
              <option key={status} value={status.toLowerCase()}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="sort-input">
          <label>Sort By: </label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="lastModifiedOldToNew">Old to New Modified</option>
            <option value="lastModifiedNewToOld">New to Old Modified</option>
          </select>
        </div>
      </div>
      <div className="send-selected-container">
        <button className="send-selected-button" onClick={handleSendSelectedCards} disabled={selectedCardIds.length === 0}>
          Send Selected Cards
        </button>
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
          onSelect={handleCardSelect}
          isSelected={selectedCardIds.includes(card.id)}
          isEditing={card.id === editingCardId}
        />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default FlashcardList;
