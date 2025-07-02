import React, { useContext, useState } from "react";
import { ContextFeature } from "../../../context/FeatureProvider";
import { ContextPlans } from "../../../context/PlanProvider";
import { filterById, getOjectById } from "../../../services/convertFunction";
import { FaCheck } from "react-icons/fa";
import { Link, Links } from "react-router-dom";

function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const feature = useContext(ContextFeature);
  const plans = useContext(ContextPlans);

  const filterPlan = plans.map((e) => e.id).reverse();

  const groupFeatureById = filterPlan.map((planId) => ({
    planId,
    features: filterById(feature, planId, "planId"),
  }));
  const selectedPlanId = filterPlan[selectedPlan];

  return (
    <div className="pt-[100px] bg-[#F2F2F2] flex flex-col items-center justify-center px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-1">
        Chọn gói Galaxy Play
      </h2>
      <p className="text-sm text-gray-500 mb-8">Huỷ bất cứ lúc nào</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {groupFeatureById.map((plan, index) => {
          const planInfo = getOjectById(plans, plan.planId);
          return (
            <>
                <div
                  key={plan.planId}
                  onClick={() => setSelectedPlan(index)}
                  className={`relative cursor-pointer rounded-xl p-6 shadow min-h-[400px] transition duration-300 hover:shadow-lg plan-shadow ${
                    selectedPlan === index
                      ? "border-4 border-blue-600 bg-white"
                      : "border border-black/5"
                  }`}
                >
                  {planInfo?.title === "Filmora VIP" && (
                    <div>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-center text-[15px] w-[90%] py-1 rounded-full">
                        Xem không giới hạn
                      </div>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 mt-4">
                    {planInfo?.title}{" "}
                  </h3>
                  <h3 className="text-xl  mb-2 mt-4">
                    {planInfo?.priceMonth.toLocaleString()}đ/tháng
                  </h3>

                  <hr className="text-gray-300 mt-4" />
                  <p className="text-lg font-medium mb-4">{plan.text}</p>

                  <ul className="space-y-2 text-sm text-gray-700">
                    {plan.features.map((f, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-[18px]"
                      >
                        <FaCheck className="text-blue-600" /> {f.text}
                      </li>
                    ))}
                  </ul>
                </div>
            </>
          );
        })}
      </div>

      <Link to={`/plans/payment/${selectedPlanId}`} className="bg-blue-600 text-white font-semibold px-8 py-3 mt-10 rounded-full hover:bg-blue-700 transition">
        Tiếp tục
      </Link>
    </div>
  );
}

export default PlansPage;
