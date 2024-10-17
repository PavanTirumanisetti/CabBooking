import React, { useState } from 'react';
import './ImageSlider.css'; // Custom CSS for styling the slider

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Make sure the paths point to the correct locations in your public folder
  const images = [
    '/images/image1.jpg', // Image located at public/images/image1.jpg
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg',
    '/images/image7.jpg',
    '/images/image8.jpg',
    '/images/image9.jpg',
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider-container">
      <div className="image-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            {index === currentSlide && (
              <img src={image} alt={`Slide ${index}`} className="slider-image" />
            )}
          </div>
        ))}
      </div>

      {/* Navigation buttons below the slider */}
      <div className="slider-buttons">
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
    </div>
  );
};

export default ImageSlider;
