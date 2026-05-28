type CardProps = {
  card: { id: number; value: string; isFlipped: boolean; isMatched: boolean };
  onClick: () => void;
  disabled: boolean;
};

export function Card({ card, onClick, disabled }: CardProps) {
  return (
    <button
      className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
      onClick={onClick}
      disabled={disabled || card.isFlipped || card.isMatched}
    >
      {card.isFlipped || card.isMatched ? card.value : '❓'}
    </button>
  );
}
