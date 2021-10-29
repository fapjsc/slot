import { useState } from 'react';

// Suit
import { List } from 'rsuite';

// Components
import Video from './Video';

// motion
import { motion } from 'framer-motion';

// Hook
import { usePositionReorder } from '../../hooks/usePositionReload';
import { useMeasurePosition } from '../../hooks/useMeasurePosition';

// Utils
import { _removeDuplicateItem } from '../../utils/helper';

// VideoItem
const Item = ({ url, updateOrder, updatePosition, ind, rotate, btnWidgetOpen }) => {
  const [isdragged, setIsDragged] = useState(false);
  const itemRef = useMeasurePosition(pos => updatePosition(ind, pos));
  console.log(btnWidgetOpen);
  return (
    <List.Item style={{ padding: 0 }}>
      <motion.div
        style={{
          zIndex: isdragged ? 2 : 1,
        }}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={1}
        layout
        ref={itemRef}
        onDragStart={() => setIsDragged(true)}
        onDragEnd={() => setIsDragged(false)}
        animate={{
          scale: isdragged ? 1.05 : 1,
        }}
        onViewportBoxUpdate={(_, delta) => {
          isdragged && updateOrder(ind, delta.y.translate);
        }}
        drag="y"
      >
        <div
          style={{
            height: rotate ? window.innerHeight : window.innerHeight / 2,
            width: rotate && btnWidgetOpen ? window.innerWidth / 2 : window.innerWidth,
            backgroundColor: '#101A21',
          }}
        >
          <Video rtcUrl={url} />
        </div>
      </motion.div>
    </List.Item>
  );
};

const DragVideo = ({ rotate, urlList, btnWidgetOpen }) => {
  urlList = _removeDuplicateItem(urlList);
  const [updatedList, updatePosition, updateOrder] = usePositionReorder(urlList);

  return (
    <List style={{ display: rotate ? 'flex' : 'block' }}>
      {updatedList.map((url, index) => (
        <Item
          key={url}
          ind={index}
          updateOrder={updateOrder}
          updatePosition={updatePosition}
          url={url}
          rotate={rotate}
          btnWidgetOpen={btnWidgetOpen}
        />
      ))}
    </List>
  );
};

export default DragVideo;
