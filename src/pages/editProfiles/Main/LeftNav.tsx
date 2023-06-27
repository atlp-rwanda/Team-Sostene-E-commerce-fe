import { Link } from 'react-router-dom';

function LeftNav() {
  return (
    <div className="w-full px-6">
      <ul className="text-[18px]">
        <li className="hiden phone:block font-bold pb-3  ">Manage my Account</li>
        <li>
          <ul>
            <li className="text-[16px] text-red-500 pb-3">
              <Link to={''}>My Profile</Link>
            </li>
          </ul>
        </li>
      </ul>

      <ul className="text-[18px]">
        <li className="font-bold pb-3">My orders</li>
        <li className="text-[16px] pb-3">My return </li>
        <li className="text-[16px] pb-3">My cancellation</li>
      </ul>
      <ul className="text-[18px]">
        <li className="font-bold pb-3">My Wishlist</li>
      </ul>
    </div>
  );
}

export default LeftNav;
