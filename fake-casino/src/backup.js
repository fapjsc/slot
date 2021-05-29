import React from 'react';

const machineItem = () => {
  return (
    <div className="App">
      <div className="App-background">
        <p>Testing Ver.1.0</p>
        <div style={styles.slotBackground}>
          <img src={'/banner-wolf.png'} />
          <div style={styles.screen}></div>
          <div style={styles.buttonTable}>
            <button style={styles.buttonMax} onClick={() => alert('hihihihi')}>
              Max
            </button>
            <button style={styles.buttonSpin} onClick={() => alert('hihihihi')}>
              Spin
            </button>
          </div>
          <div style={styles.details}></div>
        </div>
      </div>
    </div>
  );
};

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
  details: {
    width: '100%',
    height: 160,
    background: '#98aec5',
  },
};

export default machineItem;
