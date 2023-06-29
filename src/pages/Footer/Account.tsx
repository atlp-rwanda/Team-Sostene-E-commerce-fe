import { Link } from 'react-router-dom';
import { ProtectedComponent } from '../../components/roles/Protected';

function Account() {
  return (
    <div className="w-full pb-3">
      <div className="text-md py-3 font-bold">Account</div>
      <ProtectedComponent
        replace={
          <Link to={'/accounts/login'}>
            <p className="text-[15px] py-3 hover:underline">Login / Register</p>
          </Link>
        }
      >
        <div className="cont">
          <Link to={'#'}>
            <p className="text-[15px] py-3 hover:underline">My Aaccount</p>
          </Link>
          <Link to={'#'}>
            <p className="text-[15px] py-3 hover:underline">Cart</p>
          </Link>
          <Link to={'#'}>
            <p className="text-[15px] py-3 hover:underline">Wishlist</p>
          </Link>
          <Link to={'#'}>
            <p className="text-[15px] py-3 hover:underline">Shop</p>
          </Link>
        </div>
      </ProtectedComponent>
    </div>
  );
}

export default Account;
