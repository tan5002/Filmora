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
import { initialOptions } from "../../../utils/contants";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ContextMovie } from "../../../context/MovieProvider";
import { HiOutlineTicket } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { addDocument } from "../../../services/firebaseResponse";
import { ContextAccount } from "../../../context/AccountProvider";
import { useAuth } from "../../../context/AuthsProvider";
import { useNotification } from "../../../context/NotificationProvider";
function RentPayment() {
  const paymentMethods = [
    { name: "PayPal", image: paypal },
    { name: "Thẻ tín dụng", image: visa },
    { name: "Ví MoMo", image: momo },
    { name: "Ví ZaloPay", image: zalo },
    { name: "Ví ShopeePay", image: shopeepay },
    { name: "VNPAY", image: vnp },
  ];

  const [selectedPlan, setSelectedPlan] = useState(paymentMethods[0]?.name);
  const { id } = useParams();
  const {isLogin} = useAuth()
  const movies = useContext(ContextMovie);
  const priceRef = useRef(0);
  const showNotification = useNotification();
  const paymentMethod = selectedPlan;
  useEffect(() => {
    setSelectedPlan(paymentMethods[0]);
    const movie = movies.find((e) => e.id === id);
    if (movie) {
      priceRef.current = Number(movie.rent);
    }
  }, [id, movies]);
  

  

  const createSubscription = async  (transactionId) => {
  
    const starDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(starDate.getDate() + 2);
    const dataRentMovie = {
      idMovie: id,
      idUser: isLogin.id,
      paymentMethod: paymentMethod?.name,
      price: priceRef.current,
      transactionId: transactionId,
      starDate: starDate,
      expiryDate: expiryDate
    }
    await addDocument("RentMovies", dataRentMovie)
    showNotification(`Bạn đã thuê phim thành công!`, "success");

  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center pt-[100px]">
      <h2 className="text-2xl font-bold text-center mb-1">
        Phương thức thanh toán
      </h2>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        <div className="space-y-6">
          {/* Thông tin thanh toán */}
          <div className="bg-white  rounded-xl p-5 shadow text-sm space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xl">Thông tin thanh toán</span>
              <div className="text-blue-500">Thay đổi gói</div>
            </div>

            <div className="flex justify-between">
              {movies.map(
                (e) =>
                  e.id === id && (
                    <>
                      <img
                        src={e.imgUrl}
                        alt=""
                        className="object-cover w-[120px] h-[200px] rounded-2xl"
                      />
                      <div className="w-full space-y-5">
                        <div className="flex justify-between px-8">
                          <span>Tên tài khoản</span>
                          <span >{isLogin ? isLogin.userName : "ABCD"}</span>
                        </div>
                        <div className="flex justify-between px-8">
                          <span>Phim</span>
                          <span>{e?.name} </span>
                        </div>
                        <div className="flex justify-between px-8">
                          <span>Độ phân giải</span>
                          <span>HD </span>
                        </div>
                        <div className="flex justify-between px-8">
                          <span>Thời hạn</span>
                          <span>48 tiếng</span>
                        </div>
                        <div className="flex justify-between px-8">
                          <span>Đơn giá</span>
                            <span>{Number(e.rent).toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between px-8">
                          <span>Khuyến mãi</span>
                          <span>0 đ</span>
                        </div>
                        <hr className="mx-8 text-gray-300" />
                        <div className="flex justify-between font-semibold text-blue-600 px-8">
                          <span>Tổng cộng</span>
                          <span>{Number(e.rent).toLocaleString()}đ</span>
                        </div>
                      </div>
                    </>
                  )
              )}
            </div>
            <div className="mt-10 text-[10px] italic">
              * Lưu ý: Thời gian thuê phim là 30 ngày sau khi thuê và còn 48 giờ
              khi bắt đầu xem phim.
            </div>
            <hr className="text-gray-300 mt-5" />
            <div className="flex items-center justify-between mt-5 hover:cursor-pointer">
              <div className="flex items-center text-[15px] text-blue-500 underline gap-3">
                <HiOutlineTicket className="text-[40px]" />
                Áp dụng ưu đãi
              </div>
                <IoIosArrowForward className="text-2xl"/>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white  rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-3">Chọn phương thức thanh toán</h3>
            <div className="grid grid-cols-3 gap-2 mb-4 ">
              {paymentMethods.map((method, idx) => (
                <button
                  onClick={() => setSelectedPlan(method.name)}
                  className={`border px-4 py-2 rounded-lg flex flex-col items-center text-sm 
                  ${
                    selectedPlan === method.name
                      ? "border-4 border-blue-600 bg-white"
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
            disabled={!priceRef.current}
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                const total = (priceRef.current / 25000).toFixed(2);
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

export default RentPayment;
