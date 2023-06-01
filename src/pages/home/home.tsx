import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { increment } from '../../redux/slices/counterSlice';
import { SetStateAction, useState } from 'react';

function Home() {
  const { counter } = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('null');

  function raise() {
    dispatch(increment());
  }
  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setEmail(event.target.value);
  };
  return (
    <div className="home">
      <h1>Home page</h1>
      <div className="demo">
        <p>This is demo home</p>
        <p>Counter state {counter}</p>
      </div>
      <button onClick={raise}>INCREMENT COUNTER</button>
      <input
        data-testid="Input"
        type="text"
        onChange={handleInputChange}
        placeholder="enter email to test tfa"
      />
      <Link to={`/accounts/authenticate`} state={{ email }}>
        Click Here to go TFA
      </Link>
    </div>
  );
}

export default Home;
