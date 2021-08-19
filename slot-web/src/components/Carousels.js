import lotGame from '../asset/ad/lotGame.jpg';
import yourHome from '../asset/ad/yourHome.jpg';
import comingSoon from '../asset/ad/comingSoon.jpg';
import comingSoon2 from '../asset/ad/comingSoon2.jpg';

import AwesomeSlider from 'react-awesome-slider';

// Style
import AwsSliderStyles from 'react-awesome-slider/src/core/styles.scss';

import withAutoplay from 'react-awesome-slider/dist/autoplay';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Carousels = () => {
  return (
    <div
      className="gradient w-full h-auto slider-contain"
      style={{ maxWidth: '678px', margin: '0 auto' }}
    >
      <AutoplaySlider
        cssModule={[AwsSliderStyles]}
        play={true}
        interval={3000}
        cancelOnInteraction={false}
        style={{ height: '15rem', maxWidth: '100vw', margin: '0 auto' }}
      >
        <div data-src={lotGame} />
        <div data-src={yourHome} />
        <div data-src={comingSoon} />
        <div data-src={comingSoon2} />
      </AutoplaySlider>
    </div>
  );
};

export default Carousels;
