import React, { useState } from "react";
const images = [
  
   "https://imgs.search.brave.com/3EscfK4CO_wBNKcmYZJG4m3Jg-riZULVkl7FAQdx0Ds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvb25lLXBpZWNl/LWFuaW1lLTdqM2Rp/bGFsaWJzY3lmNHEu/anBn",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-6.png",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-4.png",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-3.png",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-2.png",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-1.png",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-7.png",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-8.png",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-9.png",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-10.png",
    "https://uiparadox.co.uk/templates/visuals/demo/assets/media/banner/anime-card/anime-card-11.png"

  
];

export default function SlideBanner() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="card-container">
      {images.map((img, index) => (
        <div
          key={index}
          className={`card ${activeIndex === index ? "is-active" : ""}`}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div className="card__inner">
            <picture>
              <img src={img} alt={`Image ${index + 1}`} />
            </picture>
          </div>
          {activeIndex === index && (
            <div className="absolute w-full bottom-0 left-0  rounded-2xl bg-black/50 text-white p-6 flex flex-col justify-between">
              <h2 className="text-lg font-bold">Thông tin phim</h2>
              <p className="text-sm">Movie • 1hr 45m</p>
              <div className="flex gap-2 mt-2 text-xs">
                <span className="border border-white rounded px-2 py-1">
                  New
                </span>
                <span className="border border-white rounded px-2 py-1">
                  HD
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-white text-black py-1 rounded hover:bg-black hover:text-white">
                  ▶ Play
                </button>
                <button className="flex-1 border border-white py-1 rounded hover:bg-black hover:text-white">
                  ℹ More Info
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
