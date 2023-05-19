import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { increment } from '../../redux/slices/counterSlice';

function Home() {
  const { counter } = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();

  function raise() {
    dispatch(increment());
  }
  return (
    <div className="home">
      <h1>Home page</h1>
      <div className="demo">
        <p>This is demo home</p>
        <p>Counter state {counter}</p>
      </div>
      <button onClick={raise}>INCREMENT COUNTER</button>
    </div>
  );
}

export default Home;
