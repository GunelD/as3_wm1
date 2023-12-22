import axios from 'axios';

const API_URL = 'http://localhost:3500';

export const fetchFlashCards = async () => {
  const response = await axios.get(`${API_URL}/cards`);
  return response.data;
};

export const createFlashCard = async (flashCardData) => {
  const response = await axios.post(`${API_URL}/cards`, flashCardData);
  return response.data;
};

export const updateFlashCard = async (cardId, flashCardData) => {
  const response = await axios.put(`${API_URL}/cards/${cardId}`, flashCardData);
  console.log('Updated Card:', response.data);
  return response.data;
};

export const deleteFlashCard = async (cardId) => {
  await axios.delete(`${API_URL}/cards/${cardId}`);
};
