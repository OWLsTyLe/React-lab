import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CardType, GameState } from './types.ts';

const generateCards = (): CardType[] => {
  const values = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐨'];
  return [...values, ...values]
    .map((value, index) => ({ id: index, value, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5);
};

const initialState: GameState = {
  cards: generateCards(),
  selectedCards: [],
  disableClick: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    flipCard(state, action: PayloadAction<CardType>) {
      const card = action.payload;
      state.cards = state.cards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c));
      state.selectedCards.push({ ...card, isFlipped: true });
    },
    resolveCards(state) {
      const [first, second] = state.selectedCards;
      const matched = first.value === second.value;
      state.cards = state.cards.map((c) => {
        if (matched && c.value === first.value) return { ...c, isMatched: true, isFlipped: true };
        if (c.id === first.id || c.id === second.id) return { ...c, isFlipped: false };
        return c;
      });
      state.selectedCards = [];
      state.disableClick = false;
    },
    setDisableClick(state, action: PayloadAction<boolean>) {
      state.disableClick = action.payload;
    },
    resetGame(state) {
      state.cards = generateCards();
      state.selectedCards = [];
      state.disableClick = false;
    },
  },
});

export const { flipCard, resolveCards, setDisableClick, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
