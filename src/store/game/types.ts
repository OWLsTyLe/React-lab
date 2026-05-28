export type CardType = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameState = {
  cards: CardType[];
  selectedCards: CardType[];
  disableClick: boolean;
};
