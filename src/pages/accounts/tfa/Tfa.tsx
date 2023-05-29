import { useRef } from 'react';
import { tfa_text } from '../../../constants';
import { useTwoFactor, useVerifyEmail } from './hooks';
import './style.scss';
import { ButtonLoader } from '../../../components/Loaders';

function ContainerText(props: { tfa_text: string; email: string }) {
  const { email, tfa_text } = props;
  return (
    <div className="container__box__text">
      <img
        src="https://cdn4.iconfinder.com/data/icons/cyber-security-29/512/security-cyber-digital-secure-21-512.png"
        alt="image"
      />
      <h2>Verify Your Identity</h2>
      <p>{tfa_text}</p>
      <p className="email">{email}</p>
    </div>
  );
}

export default function Tfa() {
  const email = useTwoFactor();
  const { handleSubmit, isVerified } = useVerifyEmail();
  const code = useRef<HTMLInputElement>(null);
  const handleVerify = () => {
    if (code.current?.value != '') {
      handleSubmit(email, code.current?.value);
    }
  };
  return (
    <div className="container__box_tfa">
      <ContainerText email={email} tfa_text={tfa_text} />
      <div className="container__box__input">
        <div className="form">
          <input type="text" ref={code} maxLength={6} required />
          <button onClick={handleVerify}>{isVerified.loading ? <ButtonLoader /> : 'Submit'}</button>
        </div>
      </div>
      {isVerified.error !== '' ? <p className="error">{isVerified.error}</p> : ''}
    </div>
  );
}
