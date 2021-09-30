import { useState } from 'react';
import Video from './demo/Video';

import ChatWidget from '../pages/demo/ChatWidget';

import MessageIcon from '@rsuite/icons/Message';

const GamePlayV2 = () => {
  const [chatOpen, setChatOpen] = useState(true);
  return (
    <div>
      <Video />
      <MessageIcon onClick={() => setChatOpen(true)} />
      <ChatWidget open={chatOpen} setOpen={setChatOpen} placement="bottom" height="60vh" />
    </div>
  );
};

export default GamePlayV2;
