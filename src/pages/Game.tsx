import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { flipCard, resolveCards, setDisableClick, resetGame } from '../store/game/slice';
import '../styles/App.css';
import '../styles/index.css';

const Game = () => {
  const dispatch = useAppDispatch();
  const { cards, selectedCards, disableClick } = useAppSelector((s) => s.game);
  const { username } = useAppSelector((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCards.length === 2) {
      dispatch(setDisableClick(true));
      setTimeout(() => {
        dispatch(resolveCards());
      }, 1000);
    }
  }, [selectedCards, dispatch]);

  const handleCardClick = (card: (typeof cards)[0]) => {
    if (disableClick || card.isFlipped || card.isMatched) return;
    dispatch(flipCard(card));
  };

  return (
    <div className='app'>
      <h1 style={{ textAlign: 'center' }}>{username ? `Гравець: ${username}` : 'Memory Game'}</h1>
      <div className='reset-wrapper'>
        <button onClick={() => dispatch(resetGame())} className='reset-button'>
          Reset Game
        </button>
        <button className='home-button' onClick={() => navigate('/')}>
          Home
        </button>
      </div>
      <div className='board'>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
            disabled={disableClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
