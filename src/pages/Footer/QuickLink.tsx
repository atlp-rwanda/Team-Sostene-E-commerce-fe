import { Link } from 'react-router-dom';

function QuickLink() {
  return (
    <div className="w-full pb-3">
      <div className="text-md py-3">Quick Links</div>
      <p className="text-[15px] py-3">Privacy Policy</p>
      <p className="text-[15px] py-3">Terms of use</p>
      <p className="text-[15px] py-3">FAQ</p>
      <p>
        <Link to={'/about_us'} className="text-[15px] py-3">
          About
        </Link>
      </p>
    </div>
  );
}

export default QuickLink;
