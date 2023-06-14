import { Link } from 'react-router-dom';
import image1 from '../../assets/barcode.png';
import Image from '../../assets/app-store-and-google-play.jpeg';

function Download() {
  return (
    <div className="w-full pb-2">
      <div className="text-md py-3">Download</div>
      <div className="text-[15px] py-3 cu">
        <Link to="/Home">
          <img className="w-20" src={Image} alt="playstore-image" />
        </Link>
      </div>
      <p className="text-[15px] py-3 ">
        <Link to="/barcode">
          <img className="w-20" src={image1} alt="playstore-image" />
        </Link>
      </p>
      <p className="text-[15px] py-3">Terms of use</p>
      <div className="flex text-[15px] space-x-3 w-[90%]">
        <Link to="#">Facebook</Link>
        <Link to="#">Instagram</Link>
        <Link to="#">Linkedin</Link>
      </div>
    </div>
  );
}

export default Download;
