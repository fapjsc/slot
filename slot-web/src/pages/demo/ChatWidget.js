import { useState, useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

import classes from './Chat.module.scss';
import { sendMessage } from '../../lib/chatSocket';

import Drawer from 'rsuite/Drawer';
import CloseIcon from '@rsuite/icons/Close';

const Chat = ({ open, setOpen, placement, height }) => {
  const { messageList } = useSelector(state => state.chat);
  const [newMessage, setNewMessage] = useState(false);
  const messageEndRef = useRef(null);

  const message = messageList.map((el, index) => (
    <div key={index} className={classes.message}>
      <p className={classes.meta}>
        {el.username} <span>{el.time}</span>
      </p>
      <p className={classes.text}>{el.text}</p>
    </div>
  ));

  const onChangeHandler = e => {
    if (e.target.value.trim() === '') return;
    setNewMessage(e.target.value);
  };

  const messageOnSubmit = e => {
    e.preventDefault();
    sendMessage(newMessage);
  };

  const scrollToBottom = () => {
    // 如果有messageEndRef.current, 就調用scrollIntoView
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <>
      <Drawer
        style={{ height: height }}
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
      >
        <header className={classes['chat-header']}>
          <CloseIcon className={classes.icon} onClick={() => setOpen(false)} />
          <h4>聊天室</h4>
        </header>

        <Drawer.Body style={{ padding: '1rem', height: '75%' }}>
          <div className={classes['chat-messages']}>
            {message}
            <div ref={messageEndRef} />
          </div>
        </Drawer.Body>

        <Drawer.Actions>
          <div className={classes['chat-form-container']}>
            <form onSubmit={messageOnSubmit} id="chat-form">
              <input
                id="msg"
                type="text"
                placeholder="Enter Message"
                required
                autoComplete="off"
                onChange={onChangeHandler}
              />
              <button className={classes['btn']}>
                <i className="fas fa-paper-plane"></i> Send
              </button>
            </form>
          </div>
        </Drawer.Actions>
      </Drawer>
      {/* <div className={classes['chat-container']}>
        <header className={classes['chat-header']}>
          <h3>聊天室</h3>
          <hr />
        </header>

        <div className={classes['chat-main']}>
          <div className={classes['chat-messages']}>
            {message}
            <div ref={messageEndRef} />
          </div>
        </div>

        <div className={classes['chat-form-container']}>
          <form onSubmit={messageOnSubmit} id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autoComplete="off"
              onChange={onChangeHandler}
            />
            <button className={classes['btn']}>
              <i className="fas fa-paper-plane"></i> Send
            </button>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Chat;
