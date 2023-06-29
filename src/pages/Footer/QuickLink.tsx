import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scroll';

function QuickLink() {
  return (
    <div className="w-full pb-3">
      <div className="text-md py-3 font-bold">Quick links</div>

      <Link to={'/'} onClick={scrollToTop}>
        <p className="text-[15px] py-3 hover:underline">Home</p>
      </Link>
      <Link to={'/about_us'} onClick={scrollToTop}>
        <p className="text-[15px] py-3 hover:underline">About</p>
      </Link>
      <Link to={'/contact'} onClick={scrollToTop}>
        <p className="text-[15px] py-3 hover:underline">Contact us</p>
      </Link>

      <p className="text-[15px] py-3 hover:underline">Privacy policy</p>
      <p className="text-[15px] py-3 hover:underline">Terms of use</p>
      <p className="text-[15px] py-3 hover:underline">FAQ</p>
    </div>
  );
}

export default QuickLink;
