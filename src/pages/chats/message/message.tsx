import styles from './message.module.scss';
import { format } from 'timeago.js';

interface MessageProp {
  message: {
    userId: string;
    username: string;
    message: string;
    date: string;
  };
}
interface Props extends MessageProp {
  own: boolean;
}

export const makeBgLogo = (name: string) => {
  const names = name.split(' ');
  const firstLetter = names[0][0]?.toUpperCase();
  const secondLetter = names[1] && names[1][0]?.toUpperCase();
  const logo = `${firstLetter ? firstLetter : ''}${secondLetter ? secondLetter : ''}`;
  return logo;
};

function Message(props: Props) {
  const { message, own } = props;

  return (
    <div className={styles.messages} data-testid="messages">
      <div className={own ? 'guess_who me' : 'guess_who them'}>
        <div className="message">
          <div className="info">
            {message.message}
            <small className="showOnHover">
              {message.username ? message.username : 'Unknown'}
              {own && '(you)'}
            </small>
          </div>
          <div className="sender">{makeBgLogo(message.username ? message.username : 'U N')}</div>
        </div>
        <div className="time">{format(message.date)}</div>
      </div>
    </div>
  );
}

export default Message;
