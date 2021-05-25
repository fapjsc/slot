import React, { useState, useEffect } from 'react';

function Home() {
  const [autoPlay, setAutoPlay] = useState(false);

  function spin() {
    let url = 'http://192.168.10.60/api/GameButtonApi';
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify({
        "ip": "string",
        "buttonNo": 0
      }), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => console.log(response)) // 輸出成 json
  }
  
  function openScore() {
    let url = 'http://192.168.10.60/api/OnlineCashPointApi';

    return fetch(url, {
      body: JSON.stringify({
        "amount": 1000,
        "isCashable": true,
        "inOrOut": 1, // in: 1, out: -1
        "egmId": 9, // 公司測試用會議室出口第一台ID: 9
        "cashier": "string"
      }),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then(response => console.log(response))
  }

  return (
    <div className="App">
      <div className="App-background">
        <p>
          Testing Ver.1.0
        </p>
        <div style={styles.slotBackground}>
          <img src={'/banner-wolf.png'}/>
          <div style={styles.screen}>

          </div>
          <div style={styles.buttonTable}>
            <button 
              style={styles.buttonMax}
              onClick={() => alert('hihihihi')}
            >
              Max
            </button>
            <button 
              style={styles.buttonSpin}
              onClick={() => spin()}
            >
              Spin
            </button>
            <button 
              style={styles.buttonOpen}
              onClick={() => openScore()}
            >
              開分
            </button>
            <button 
              style={styles.buttonOpen}
              onClick={() => setAutoPlay(pre => {
                console.log('auto staus: ', !pre); 
                return !pre;
              })}
            >
              自動
            </button>
          </div>
          <div style={styles.details}>

          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  slotBackground: {
    width: 300,
    height: 700,
    background: '#FFFFFF',
  },
  screen: {
    width: 300,
    height: 360,
    background: 'gray',
  },
  buttonTable: {
    background: '#4a78ba',
    display: 'flex',
    flexdirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonMax: {
    width: 80,
    height: 50,
    background: 'yellow',
    color: 'gray',
    fontSize: 35,
    // display: 'block',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  buttonSpin: {
    width: 80,
    height: 50,
    background: 'lightblue',
    // color: 'gray',
    fontSize: 35,
    // display: 'block',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  buttonOpen: {
    width: 80,
    height: 50,
    background: 'lightgreen',
    color: 'lightred',
    fontSize: 20,
    // display: 'block',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  details: {
    width: '100%',
    height: 160,
    background: '#98aec5',
  },
};

export default Home;
