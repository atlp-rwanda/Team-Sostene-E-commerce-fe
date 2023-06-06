import { resent_link_sent } from '../../../utils/constants';

export default function ResetLinkSent() {
  return (
    <div className="container__box_reset_p">
      <div className="container__box__text">
        <img src={resent_link_sent.image} alt="" />
        <p className="p-success text-lg py-4">{resent_link_sent.text}</p>
      </div>
    </div>
  );
}
