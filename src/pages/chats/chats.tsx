/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import styles from './chats.module.scss';
import initializeSocket from '../../components/notification/sockets';
import Message from './message/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { decodeToken } from '../payment/hooks/hooks';
import { useAppSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { setMessageChat } from './chats.slice';

interface MessageInterfaces {
  userId: string;
  username: string;
  message: string | any;
  date: string;
  socketId?: string;
}

interface MessageInterfaces extends Iterable<MessageInterfaces> {
  [Symbol.iterator](): Iterator<MessageInterfaces>;
}

const Chats: React.FC = () => {
  const socket = initializeSocket();
  const dispatch = useDispatch();
  const [messagesArr, setMessagesArr] = useState<MessageInterfaces[] | []>([]);

  const { messageChat } = useAppSelector((state) => state.chatsReducers);
  const token = useAppSelector((state) => state.token.value);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const user: any = token && decodeToken(token);

  const handleChangetyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessageChat(e.target.value));
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageChat && messageChat !== '') {
      socket.emit('message', messageChat);
    }
    dispatch(setMessageChat(''));
  };

  useEffect(() => {
    socket.emit('join');
    socket.on('message', (message: MessageInterfaces) => {
      setMessagesArr((prev) => [...prev, message]);
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messagesArr]);

  return (
    <div className={styles.chats} data-testid="chatsFrame">
      <div className="chat_container" ref={messageContainerRef}>
        {messagesArr &&
          messagesArr.map((msg, index) => {
            return (
              msg.message &&
              !msg.message?.message && (
                <Message own={msg.userId === user?.id} message={msg} key={index} />
              )
            );
          })}
      </div>
      <form className="chat-form" onSubmit={handleSubmitMessage} autoComplete="off">
        <textarea
          name="messageTypingBox"
          id="message"
          role="typingBox"
          className="messageTypingBox"
          placeholder="Write a message ..."
          value={messageChat}
          onChange={handleChangetyping}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmitMessage(e)}
        ></textarea>
        <button type="submit" className="button">
          <FontAwesomeIcon icon="paper-plane" />
        </button>
      </form>
    </div>
  );
};

export default Chats;
