import { reset_password_success } from '../../../utils/constants';
import { Button } from '../../../components/reusables/Reusable';
import { Link } from 'react-router-dom';

export default function ResetSuccessful() {
  return (
    <div className="container__box_reset_p">
      <div className="container__box__text">
        <img src={reset_password_success.image} alt="" />
        <p className="p-success py-4">{reset_password_success.text}</p>
      </div>
      <div className="btn__container">
        <Link to="/accounts/login">
          <Button text="Login" size="full" />
        </Link>
      </div>
    </div>
  );
}
