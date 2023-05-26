import React, { useState } from 'react'
import './slider.css'
  

const Slider = ({imagenes,setShowSlider}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? imagenes.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === imagenes.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };
    const slideStylesWidthBackground = {
        backgroundImage: `url(${imagenes[currentIndex]})`,
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
                {imagenes.map((imagen, slideIndex) => (
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