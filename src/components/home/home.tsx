import "./home.css";
import { useAppSelector , useAppDispatch} from "../../redux/hooks";
import { increment } from "../../redux/slices/counterSlice";

function Home() {
  const {counter} = useAppSelector( state => state.count)
  const dispatch = useAppDispatch()

  function raise(){
    dispatch(increment())
  }
  return (
    <div className="home">
      <h1>home page</h1>
      <div className="demo">
        <p>This is dem home</p>
        <p>counter state {counter}</p>
        <div className="boxsm">
          <div className="left">
            <img src="./images/clientworking.png" alt="woman" className="client" />
            <img src="./svgs/view-grid.svg" alt="icon" className="icon" />
          </div>
          <div className="right">
            <img src="./images/userImg.png" alt="woman" className="client" />
            <img src="./svgs/blockchain.svg" alt="icon" className="icon" />
          </div>
        </div>
      </div>
      <button onClick={raise}>INCREMENT COUNTER</button>
    </div>
  );
}

export default Home;
