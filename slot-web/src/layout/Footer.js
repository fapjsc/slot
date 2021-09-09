import { useState, useEffect, useCallback } from 'react';

import SpeedIcon from '@material-ui/icons/Speed';
import IconButton from '@material-ui/core/IconButton';

const Footer = () => {
  const [speed, setSpeed] = useState('');
  const [testSpeed, setTestSpeed] = useState(false);

  const getSpeedWithImg = async (imgUrl, fileSize) => {
    try {
      return new Promise((resolve, reject) => {
        let start = null;
        let end = null;
        let img = document.createElement('img');

        start = new Date().getTime();
        img.onload = function (e) {
          end = new Date().getTime();
          console.log('onload speed', end);
          const speed = (fileSize * 1000) / (end - start);
          resolve(speed);
        };
        img.src = imgUrl;
      });
    } catch (err) {
      throw err;
    }
  };

  const getSpeed = useCallback(async () => {
    setTestSpeed(true);
    const res = await getSpeedWithImg('https://upload.cc/i1/2021/08/25/NBIHOJ.jpg', 2334.72);
    setSpeed((res / 1024).toFixed(2));
    setTestSpeed(false);
  }, []);

  useEffect(() => {
    getSpeed();
  }, [getSpeed]);

  return (
    <footer style={footerStyle}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
      >
        <SpeedIcon />
        <span style={{ marginLeft: '5px', fontSize: '15px', color: '#fff' }}>
          {speed && !testSpeed ? `${speed} MB/s` : 'checking...'}
        </span>
      </IconButton>
      <p>v-f.0.2.2-b.0.1.0</p>
    </footer>
  );
};

const footerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: 'rgba(66, 7, 105, 0.911)',
  width: '100%',
};

export default Footer;
