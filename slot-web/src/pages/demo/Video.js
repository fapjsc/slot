import { useRef, useEffect, useCallback } from 'react';
import { SrsRtcPlayerAsync } from '../../utils/srs.sdk';

const Video = ({ rtcUrl: url }) => {
  const cameraRef = useRef();
  const sdkRef = useRef();

  const startPlay = useCallback(() => {
    if (sdkRef.current) {
      sdkRef.current.close();
    }
    sdkRef.current = SrsRtcPlayerAsync();

    sdkRef.current
      .play(url)
      // .play('webrtc://220.135.67.240/game/11')
      .then(session => {
        // console.log(session, 'session');
        if (cameraRef.current) cameraRef.current.srcObject = sdkRef.current.stream;
      })
      .catch(e => {
        console.log(e, 'error catch');
        sdkRef.current.close();
      });
  }, [url]);

  useEffect(() => {
    startPlay();
    cameraRef.current.muted = false;
  }, [startPlay]);

  return (
    <video
      ref={cameraRef}
      id="video-webrtc"
      autoPlay
      controls
      muted
      playsInline
      style={{
        objectFit: 'contain',
        height: '100%',
        width: '100%',
      }}
    />
  );
};

export default Video;
