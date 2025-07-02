import React, { useContext, useState } from "react";
import { ContextPlans } from "../../../context/PlanProvider";
import { filterById, getOjectById } from "../../../services/convertFunction";
import { ContextFeature } from "../../../context/FeatureProvider";
import { ContextMovie } from "../../../context/MovieProvider";

import { FaCheck } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

function RentPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { id } = useParams();
  const movies = useContext(ContextMovie);

  const plans = useContext(ContextPlans);
  const feature = useContext(ContextFeature);
  const filterPlan = plans
    .map((e) => e.id)
    .reverse()
    .slice(1);

  const groupFeatureById = filterPlan.map((planId) => ({
    planId,
    features: filterById(feature, planId, "planId"),
  }));

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-6 flex flex-col items-center pt-[100px]">
      <h2 className="text-xl font-bold text-center mb-1">
        Phương thức thanh toán
      </h2>
      <div className="w-full max-w-md space-y-6 mt-6">
        {/* Bạn đang chọn thuê */}
        <div className="text-center">
          <p className="text-blue-600 font-medium mb-2">Bạn đang chọn thuê</p>
          <div className="border-2 border-blue-500 rounded-xl p-4 text-sm font-semibold">
            {movies.map(
              (e) =>
                e.id === id && (
                  <div key={e.id} className="flex justify-between">
                    <span>{e.name}</span>
                    <span>{e.rent.toLocaleString("vi-VND")}đ</span>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="text-center relative">
          <div class="flex items-center justify-center my-6">
            <div class="flex-grow h-px bg-gray-300"></div>
            <span class="mx-4 text-blue-600 font-semibold whitespace-nowrap">
              Tiết kiệm hơn với Combo
            </span>
            <div class="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="space-y-4">
            {groupFeatureById.map((item, index) => {
              const planInfo = getOjectById(plans, item.planId);
              return (
                <div
                  key={item.planId}
                  onClick={() => setSelectedItem(index)}
                  className={`relative border rounded-xl p-4  shadow cursor-pointer transition hover:shadow-lg plan-shadow  ${
                    selectedItem === index
                      ? " border-4 border-blue-600 bg-white"
                      : "border-gray-200"
                  }`}
                >
                  {planInfo?.title === "Filmora VIP" && (
                    <span className="absolute -top-3 -right-16 -translate-x-1/2 mt-2 mr-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      Lựa chọn tốt nhất
                    </span>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{planInfo?.title}</h3>
                    <span className="font-semibold">
                      {planInfo?.priceMonth.toLocaleString("vi-VND")}đ
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 text-start">
                    {item.features.map((f, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-[18px]"
                      >
                        <FaCheck className="text-blue-600" /> {f.text}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Link
        to={`/rent/payment/${id}`}
        className="bg-blue-600 text-white font-semibold w-[30%] text-center py-3 mt-10 rounded-full hover:bg-blue-700 transition"
      >
        Tiếp tục
      </Link>

      <p className="text-center text-sm text-blue-600 underline cursor-pointer mt-5">
        Xem kho phim và thanh toán sau
      </p>
    </div>
  );
}

export default RentPage;
