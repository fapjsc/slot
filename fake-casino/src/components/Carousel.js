import Slider from 'react-slick';

// Style
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../asset/1.jpg';
import img2 from '../asset/2.jpg';
import img3 from '../asset/3.jpg';

export default function SimpleSlider() {
  // Router Props

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderBox = {
    backgroundColor: 'white',
    maxWidth: 1140,
    height: 360,
    margin: '10px auto',
    overflow: 'hidden',
  };

  const img1Style = {
    width: '100%',
  };

  const handleClick = () => {
    const w = window.open('about:blank');
    w.location.href = 'http://localhost:3001/';
  };

  return (
    <Slider {...settings} style={sliderBox} autoplay={true}>
      <div onClick={handleClick}>
        <img style={img1Style} src={img1} alt="1" />
      </div>
      <div>
        <img style={img1Style} src={img2} alt="2" />
      </div>
      <div>
        <img style={img1Style} src={img3} alt="3" />
      </div>
    </Slider>
  );
}
