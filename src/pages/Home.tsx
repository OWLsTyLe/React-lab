import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/user/slice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = {
  username: string;
  age: number;
};

const schema = yup.object({
  username: yup
    .string()
    .required("Ім'я обов'язкове")
    .min(2, 'Мінімум 2 символи')
    .max(20, 'Максимум 20 символів'),

  age: yup
    .number()
    .required("Вік обов'язковий")
    .min(5, 'Мінімальний вік — 5')
    .max(99, 'Максимальний вік — 99'),
});

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    dispatch(setUser({ username: data.username, age: Number(data.age) }));
    navigate('/game');
  };

  return (
    <div className='home-container'>
      <h1>Memory Game</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
        <h2>Реєстрація</h2>

        <div className='form-group'>
          <label htmlFor='username'>Ім'я гравця</label>
          <input id='username' placeholder="Введіть ім'я" {...register('username', {})} />
          {errors.username && <span className='error'>{errors.username.message}</span>}
        </div>

        <div className='form-group'>
          <label htmlFor='age'>Вік</label>
          <input id='age' type='number' placeholder='Введіть вік' {...register('age', {})} />
          {errors.age && <span className='error'>{errors.age.message}</span>}
        </div>

        <button type='submit' className='start-button'>
          Почати гру
        </button>
      </form>
    </div>
  );
};

export default Home;
