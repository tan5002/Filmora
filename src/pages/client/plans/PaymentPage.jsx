import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextPackage } from "../../../context/PackageProvider";
import { ContextPlans } from "../../../context/PlanProvider";
import zalo from "../../../assets/zalo.png";
import visa from "../../../assets/visa.png";
import vnp from "../../../assets/vnp.png";
import paypal from "../../../assets/paypal.png";
import momo from "../../../assets/momo.png";
import shopeepay from "../../../assets/shopeepay.png";
import avatar from "../../../assets/avatar.png";
import { getOjectById } from "../../../services/convertFunction";
import { initialOptions } from "../../../utils/contants";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { addDocument } from "../../../services/firebaseResponse";
import { useAuth } from "../../../context/AuthsProvider";

function PaymentPage() {
  const paymentMethods = [
    { name: "PayPal", image: paypal },
    { name: "Thẻ tín dụng", image: visa },
    { name: "Ví MoMo", image: momo },
    { name: "Ví ZaloPay", image: zalo },
    { name: "Ví ShopeePay", image: shopeepay },
    { name: "VNPAY", image: vnp },
  ];

  const [selectedDuration, setSelectedDuration] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(paymentMethods[0]?.name);
  const [packList, setPackList] = useState([]);
  const { id } = useParams();
  const packageList = useContext(ContextPackage);
  
  const plans = useContext(ContextPlans);
  const [plan, setPlan] = useState({});
  const priceRef = useRef(0);
  const today = new Date();
  
  useEffect(() => {
    const filterPackage = packageList
      .filter((e) => e.planId === id)
      .sort((a, b) => a.time - b.time);
    setPackList(filterPackage);
    setSelectedDuration(filterPackage[0]);
    setSelectedPlan(paymentMethods[0]);
    setPlan(getOjectById(plans, id));
  }, [id, packageList]);

  useEffect(() => {
     priceRef.current = total();
  },[selectedDuration]);

  const getExpiredDate = () => {
    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(
      startDate.getMonth() + (parseInt(selectedDuration?.time) || 1)
    );
    return expiryDate.toLocaleString("vi-VN");
  };

  const total = () => {
    return (
      plan?.priceMonth * selectedDuration?.time -
      plan?.priceMonth *
        selectedDuration?.time *
        (selectedDuration?.discount / 100)
    );
  };
  const {isLogin} = useAuth();  
const createSubscription = async (id) => {
    const starDate = today.toLocaleString("vi-VN");
    const expiryDate = getExpiredDate();
    const paymentMethod = selectedPlan;
    const subscriptionData = {
      planId: plan?.id,
      starDate: starDate,
      expiryDate: expiryDate,
      paymentMethod: paymentMethod?.name,
      transactionId: id,
      accountId: isLogin.id
    }
    await addDocument("Subscriptions", subscriptionData);
}

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center pt-[100px]">
      <h2 className="text-2xl font-bold text-center mb-1">
        Phương thức thanh toán
      </h2>
      <p className="text-sm text-gray-500 mb-6">Huỷ bất cứ lúc nào</p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* Gói thời hạn */}
          <div className="bg-white  rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-3">Thời hạn Gói Cao Cấp</h3>
            {packList.map((item, index) => (
              <label
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer border ${
                  selectedDuration?.id === item.id
                    ? "border-blue-600"
                    : "border-gray-200"
                } mb-2 hover:border-blue-400`}
              >
                <div>
                  <div className="flex items-center gap-2 font-medium">
                    <input
                      type="radio"
                      name="goi"
                      checked={selectedDuration?.id === item.id}
                      onChange={() => setSelectedDuration(item)}
                    />
                    {item.time} thang
                  </div>
                  {item.discount !== "0" && (
                    <div className="text-sm text-gray-600">
                      Tiết kiệm {item.discount} %
                    </div>
                  )}
                </div>
                <div className="text-right font-semibold text-black">
                  <>
                    <span>
                      {(
                        plan.priceMonth * item.time -
                        plan.priceMonth * item.time * (item.discount / 100)
                      ).toLocaleString()}{" "}
                      đ
                    </span>
                    {item.discount != 0 && (
                      <div className="line-through text-sm text-gray-400">
                        {(plan.priceMonth * item.time).toLocaleString()} đ
                      </div>
                    )}
                  </>
                </div>
              </label>
            ))}
          </div>

          {/* Thông tin thanh toán */}
          <div className="bg-white  rounded-xl p-5 shadow text-sm space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xl">Thông tin thanh toán</span>
              <div className="text-blue-500">Thay đổi gói</div>
            </div>
            <div className="flex justify-between">
              <img
                src={avatar}
                alt=""
                className="object-cover h-[200px] rounded-2xl"
              />
              <div className="w-full space-y-5">
                <div className="flex  justify-between px-8">
                  <span>Tên gói</span>
                  <span>Gói Cao Cấp</span>
                </div>
                <div className="flex justify-between px-8">
                  <span>Thời hạn</span>
                  <span>{selectedDuration?.time} Tháng</span>
                </div>
                <div className="flex justify-between px-8">
                  <span>Ngày hiệu lực</span>
                  <span>{today.toLocaleString("vi-VN")}</span>
                </div>
                <div className="flex justify-between px-8">
                  <span>Tự động gia hạn</span>
                  <span>{getExpiredDate()}</span>
                </div>
                <div className="flex justify-between px-8">
                  <span>Đơn giá</span>
                  <span>{total().toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between px-8">
                  <span>Khuyến mãi</span>
                  <span>0đ</span>
                </div>
                <hr className="mx-8 text-gray-300" />
                <div className="flex justify-between font-semibold text-blue-600 px-8">
                  <span>Tổng cộng</span>
                  <span>{total().toLocaleString()}đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white  rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-3">Chọn phương thức thanh toán</h3>
            <div className="grid grid-cols-3 gap-2 mb-4 ">
              {paymentMethods.map((method, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPlan(idx)}
                  className={`border px-4 py-2 rounded-lg flex flex-col items-center text-sm 
                  ${
                    selectedPlan === idx
                      ? "border-4 border-blue-600 bg-white "
                      : "border border-black/5"
                  }`}
                >
                  <img
                    src={method.image}
                    alt=""
                    className={`text-2xl mb-1 ${
                      selectedPlan === idx ? "" : "opacity-20" 
                    }`}
                  />
                  {method.name}
                </button>
              ))}
            </div>
          </div>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                const total = (priceRef.current/ 25000).toFixed(2);
                return actions.order.create({  
                  purchase_units: [
                    {
                      amount: {
                        value: total,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const transactionId = details.id; // Lấy ID giao dịch từ PayPal
                  createSubscription(transactionId);
                });
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
              }}
            />
          </PayPalScriptProvider>
          <p className="text-center text-sm text-gray-500 underline cursor-pointer">
            Xem kho phim và thanh toán sau
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
