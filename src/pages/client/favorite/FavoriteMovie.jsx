import React from "react";

function FavoriteMovie() {
  return (
    <div className="pt-[100px]">
      <div className="flex flex-col md:flex-row gap-8 text-white p-6">
        {/* Danh sách yêu thích */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-list" /> Danh sách yêu thích của bạn
          </h2>
          <div className="flex gap-4 flex-wrap">
            <img
              src="https://imgs.search.brave.com/YbH_mcIngqeg_Frjba9_hL8zDP74ez27uDSlctR5edM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jaW5l/bWEubW9tb2Nkbi5u/ZXQvaW1nLzEzNDU5/MjMwOTg4MDM0MjYx/LUdhJUNDJUEzJUND/JTg2cExhJUNDJUEz/aUNoaSVDQyVBM0Jh/JUNDJTgyJUNDJTgw/dS5wbmc"
              alt="Gặp lại chị Bầu"
              className="w-36 rounded hover:scale-105 transition-transform duration-200"
            />
            <img
              src="https://imgs.search.brave.com/YbH_mcIngqeg_Frjba9_hL8zDP74ez27uDSlctR5edM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jaW5l/bWEubW9tb2Nkbi5u/ZXQvaW1nLzEzNDU5/MjMwOTg4MDM0MjYx/LUdhJUNDJUEzJUND/JTg2cExhJUNDJUEz/aUNoaSVDQyVBM0Jh/JUNDJTgyJUNDJTgw/dS5wbmc"
              alt="Gintama"
              className="w-36 rounded hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>

        {/* Lịch sử xem phim */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-clock" /> Lịch sử xem phim của bạn
          </h2>

          <div className="flex gap-4">
            <img
              src="https://imgs.search.brave.com/YbH_mcIngqeg_Frjba9_hL8zDP74ez27uDSlctR5edM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jaW5l/bWEubW9tb2Nkbi5u/ZXQvaW1nLzEzNDU5/MjMwOTg4MDM0MjYx/LUdhJUNDJUEzJUND/JTg2cExhJUNDJUEz/aUNoaSVDQyVBM0Jh/JUNDJTgyJUNDJTgw/dS5wbmc"
              alt="Gặp lại chị Bầu"
              className="w-20 h-25 object-cover rounded"
            />
            <div className="flex-1 ">
              <div className="flex justify-between items-center flex-wrap">
                <p className="font-semibold">Gặp Lại Chị Bầu</p>
                <span className="text-sm text-gray-300">Tập Full HD</span>
              </div>
              <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                "Gặp Lại Chị Bầu" là một bộ phim điện ảnh...
              </p>
              <p className="text-xs text-gray-500 mt-2">5/3/2025</p>
              <hr className="border-gray-700 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoriteMovie;
