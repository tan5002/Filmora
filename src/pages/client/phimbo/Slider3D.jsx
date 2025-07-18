import React, {  useState } from "react";

const images = [
  {
    src: "https://imgs.search.brave.com/KC9-ufbs-NwPPIPkXbRyzR3BAZqs1bROP_b5SQqGVxI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZXVyb3Bvc3RlcnMu/ZXUvaW1hZ2UvMzUw/L3Bvc3RlcnMvb25l/LXBpZWNlLXNoYW5r/cy1sdWZmeS1pMjQ1/MDUxLmpwZw",
    title: "Slider 01",
  },
  {
    src:     "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-4.png",

    title: "Slider 02",
  },
  {
    src:     "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-7.png",


    title: "Slider 03",
  },
  {
    src:     "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-9.png",


    title: "Slider 04",
  },
  {
    src:    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-10.png",


    title: "Slider 05",
  },
];

export default function Slider3D() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };


  return (
    <>
      <div className="slider">
        <div className="list">
          {images.map((img, index) => (
            <div
              className={`item ${index === activeIndex ? "active" : ""}`}
              key={index}
            >
              <img src={img.src} alt={img.title} />
              <div className="content text-white">
                <p>design</p>
                <h2>{img.title}</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore, neque? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ipsum, ex.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button onClick={prevSlide} >&lt;</button>
          <button onClick={nextSlide}>&gt;</button>
        </div>
        <div className="thumbnail">
          <div className="flex gap-3">
            {images.map((img, index) => (
              <div
                className={`item  ${index === activeIndex ? "active" : ""}`}
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={img.src}
                  alt={`thumb-${index}`}
                  className="w-10 h-20 object-cover rounded-[8px]"
                />
                <div className="content">Name Slider</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </>
  );
}
