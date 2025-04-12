import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "Buy & Sell Pre-Owned Books",
    subtitle: "Give your books a second life and earn back your money.",
    link: "/sellbooks",
    buttonText: "Sell a Book"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "Read, Resell & Keep Books in Circulation",
    subtitle: "Every book becomes an asset. Sell to readers lined up and ready, right after you're done reading. It's not a rental—you own it as long as you want.",
    link: "/buybooks",
    buttonText: "Browse Books"
  }
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative container mx-auto overflow-hidden mt-4 rounded-lg shadow-md" style={{ maxWidth: "1600px" }}>
      <div className="relative w-full h-[55vh] md:h-[65vh]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0"}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="h-full flex items-center justify-center bg-black bg-opacity-50 px-6">
              <div className="text-center text-white max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-base md:text-lg mb-6">{slide.subtitle}</p>
                <Link
                  to={slide.link}
                  className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
