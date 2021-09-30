import { useRef, useEffect, useCallback } from 'react';
import { SrsRtcPlayerAsync } from '../../utils/srs.sdk';

import { connectChatSocket } from '../../lib/chatSocket';

const Video = () => {
  const cameraRef = useRef();
  const sdkRef = useRef();

  const startPlay = useCallback(() => {
    if (sdkRef.current) {
      sdkRef.current.close();
    }
    sdkRef.current = SrsRtcPlayerAsync();

    let url = `webrtc://220.135.67.240/live/29`;

    sdkRef.current
      .play(url)
      .then(session => {
        console.log(session, 'session');
        if (cameraRef.current) cameraRef.current.srcObject = sdkRef.current.stream;
      })
      .catch(e => {
        console.log(e, 'error catch');
        sdkRef.current.close();
      });
  }, []);

  useEffect(() => {
    startPlay();
    connectChatSocket();
  }, [startPlay]);

  return (
    <>
      <div style={{ backgroundColor: 'black', minHeight: '40vh' }}>
        <video
          ref={cameraRef}
          // id="video-webrtc"
          autoPlay
          controls
          playsInline
          width="100%"
          style={{ height: '40vh' }}
        />
      </div>
    </>
  );
};

export default Video;
