import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
    title: "Nearly All in the Men in Lagos are Mad",
    link: "/sellbooks",
    text: "SELL BOOK"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM0MTM2fQ&auto=format&fit=crop&w=1600&q=80",
    title: "BROKEN",
    link: "/buybooks",
    text: "BUY BOOK"
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="relative container mx-auto overflow-hidden" style={{ maxWidth: "1600px", position: "relative" }}>
      <div className="relative w-full h-[50vh]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0"}`}
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="h-full flex items-center justify-center bg-black bg-opacity-30">
              <div className="text-center text-white">
                <p className="text-2xl mb-4">{slide.title}</p>
                <Link className="text-lg border-b border-white hover:text-gray-300" to={slide.link}>
                  {slide.text}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>



      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${index === currentSlide ? "bg-white scale-125" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
