import './styles.scss';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import ResetSuccessful from './ResetPasswordSuccessful';
import ResetPassword from './ResetPassword';
import ResetLinkSent from './ResetLinkSent';

export default function Reset() {
  return (
    <div className="account__container">
      <Routes>
        <Route path="/" element={<ForgotPassword />}></Route>
        <Route path="/sent" element={<ResetLinkSent />}></Route>
        <Route path="/success" element={<ResetSuccessful />}></Route>
        <Route path="/new/:token" element={<ResetPassword />}></Route>
      </Routes>
    </div>
  );
}
