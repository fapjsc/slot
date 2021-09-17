import { useRef, useEffect, useCallback } from 'react';
import { SrsRtcPlayerAsync } from '../../utils/srs.sdk';

const RtmpDemo = () => {
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
  }, [startPlay]);

  return (
    <video
      ref={cameraRef}
      id="video-webrtc"
      autoPlay
      controls
      playsInline
      // style={{ width: '100%', height: '100%' }}
      width="100%"
      height="100%"
    />
  );
};

export default RtmpDemo;
