import React, { useState } from 'react'
import images from '../../assets/images/images'
import './slider.css'
  

const Slider = ({setShowSlider}) => {

    const slides = [
        { url: images.plato1, title: "beach" },
        { url: images.plato2, title: "boat" },
        { url: images.plato3, title: "forest" },
        { url: images.plato4, title: "city" },
        { url: images.plato1, title: "italy" },
      ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };
    const slideStylesWidthBackground = {
        backgroundImage: `url(${slides[currentIndex].url})`,
    };


    return (
                   
        <div className="sliderStyles">
            <button
              onClick={() => setShowSlider(false)}
            >Cerrar</button>
            <div>
                <div onClick={goToPrevious} className="leftArrowStyles">
                ❰
                </div>
                <div onClick={goToNext} className="rightArrowStyles">
                ❱
                </div>
            </div>
            <div className='slideStyles' style={slideStylesWidthBackground}></div>
            <div className="dotsContainerStyles">
                {slides.map((slide, slideIndex) => (
                <div
                    className="dotStyle"
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                >
                    ●
                </div>
                ))}
            </div>
        </div>
  )
}

export default Slider