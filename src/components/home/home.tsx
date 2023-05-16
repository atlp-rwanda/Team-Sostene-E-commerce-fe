import "./home.css";

function Home() {
  return (
    <div className="home">
      <h1>home page</h1>
      <div className="demo">
        <p>This is dem home</p>
        <div className="boxsm">
          <div className="left">
            <img
              src="./images/clientworking.png"
              alt="woman"
              className="client"
            />
            <img src="./svgs/view-grid.svg" alt="icon" className="icon" />
          </div>
          <div className="right">
            <img src="./images/userImg.png" alt="woman" className="client" />
            <img src="./svgs/blockchain.svg" alt="icon" className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
