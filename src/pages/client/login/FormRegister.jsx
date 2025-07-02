import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import   {  addDocument }  from "../../../services/firebaseResponse";
import { useNotification } from "../../../context/NotificationProvider";
import { ContextAccount } from "../../../context/AccountProvider";
import { ROLES } from "../../../utils/contants";
const inner = { userName: "", email: "", password: "", confirmPassword: "" , role : ROLES.USER };
function FormRegister({ setTab }) {
  const [register, setRegister] = useState(inner);
  const [error, setError] = useState(inner);
  const accounts = useContext(ContextAccount)
  const showNotification = useNotification();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };
  const validationForm = () => {
    const newError = {};
    const result = accounts.some(e => e.email == register.email);
      newError.userName = register.userName ? "" : "Muc khong de trong";
      newError.email = register.email ? "" : "Muc khong de trong";
      if(result) {
        newError.email = "Tai khoan email da duoc su dung" ;
      }
      newError.password = register.password ? "" : "Muc khong de trong";
      newError.confirmPassword = register.confirmPassword
        ? ""
        : "Muc khong de trong";
      if (register.confirmPassword !== register.password) {
        newError.confirmPassword = "Xac thuc lai mat khau";
      }
    
    setError(newError);
    return Object.values(newError).every((e) => e === "");
  };

  const handleSave = async () => {
    if (!validationForm()) {
      return;
    }
    const { confirmPassword, ...account } = register;
    await addDocument("Accounts", account);
    showNotification('Register successfully!', "success");
    setTab(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <TextField
        onChange={handleChange}
        name="userName"
        helperText={error.userName}
        error={!!error.userName}
        type="text"
        placeholder="Họ tên"
        sx={{
          "& .MuiInputBase-input": {
            color: "white", // màu chữ khi nhập
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // viền trắng
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc", // viền khi hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // viền khi focus
          },
          input: {
            "::placeholder": {
              color: "rgba(255,255,255,0.6)", // placeholder trắng mờ
            },
          },
        }}
      />
      <TextField
        onChange={handleChange}
        name="email"
        helperText={error.email}
        error={!!error.email}
        type="email"
        placeholder="Email "
        sx={{
          "& .MuiInputBase-input": {
            color: "white", // màu chữ khi nhập
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // viền trắng
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc", // viền khi hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // viền khi focus
          },
          input: {
            "::placeholder": {
              color: "rgba(255,255,255,0.6)", // placeholder trắng mờ
            },
          },
        }}
      />
      <TextField
        onChange={handleChange}
        name="password"
        helperText={error.password}
        error={!!error.password}
        type="password"
        placeholder="Mat khau"
        sx={{
          "& .MuiInputBase-input": {
            color: "white", // màu chữ khi nhập
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // viền trắng
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc", // viền khi hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // viền khi focus
          },
          input: {
            "::placeholder": {
              color: "rgba(255,255,255,0.6)", // placeholder trắng mờ
            },
          },
        }}
      />
      <TextField
        onChange={handleChange}
        name="confirmPassword"
        helperText={error.confirmPassword}
        error={!!error.confirmPassword}
        type="password"
        placeholder="Xac nhan mat khau"
        sx={{
          "& .MuiInputBase-input": {
            color: "white", // màu chữ khi nhập
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // viền trắng
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc", // viền khi hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // viền khi focus
          },
          input: {
            "::placeholder": {
              color: "rgba(255,255,255,0.6)", // placeholder trắng mờ
            },
          },
        }}
      />
        <button onClick={handleSave} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md font-semibold">
            Signup
        </button>
    </div>
  );
}

export default FormRegister;
