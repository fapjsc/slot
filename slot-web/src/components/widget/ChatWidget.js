import { useState, useRef, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Chat Socket
import { sendMessage } from '../../lib/chatSocket';

// Style
import classes from './ChatWidget.module.scss';

// Rsuite Components
import { Drawer, Input, InputGroup } from 'rsuite';

// React Chat Element
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

// Icon
import { RiSendPlaneFill, RiCloseCircleFill } from 'react-icons/ri';

const ChatWidget = ({ open, setOpen, placement, height, width }) => {
  // State
  const [enterMessage, setEnterMessage] = useState('');

  // Store
  const { messageList } = useSelector(state => state.chat);

  // Ref
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  const onChangeHandler = e => {
    if (e.trim() === '') return;
    setEnterMessage(e.trim());
  };

  const messageOnSubmit = e => {
    e.preventDefault();
    if (enterMessage.trim() === '') return;
    sendMessage(enterMessage);
    setEnterMessage('');
  };

  const scrollToBottom = () => {
    // 如果有messageEndRef.current, 就調用scrollIntoView
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const message = messageList.map((el, index) => (
    <div key={index}>
      <MessageBox
        position={'left'}
        title={el.username}
        titleColor={'blue'}
        type={'text'}
        text={el.text}
        dateString={el.time}
      />
    </div>
  ));

  return (
    <>
      <Drawer
        style={{
          height: height,
          width: width ? width : '100%',
          padding: 0,
        }}
        className={classes.drawerBody}
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Drawer.Body className={classes.drawerBody}>
          <div className={classes['chat-header']}>
            <RiCloseCircleFill onClick={() => setOpen(false)} />
          </div>

          <div className={classes['chat-body']}>
            {message}
            <div ref={messageEndRef} />
          </div>

          <div className={classes.footer}>
            <InputGroup inside>
              <Input
                placeholder="  Enter message..."
                value={enterMessage}
                onChange={onChangeHandler}
                ref={inputRef}
              />
              <InputGroup.Button onClick={messageOnSubmit}>
                <RiSendPlaneFill style={{ color: 'blue', fontSize: '1.2rem' }} />
              </InputGroup.Button>
            </InputGroup>
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default ChatWidget;
