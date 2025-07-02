import { TextField } from "@mui/material";
import React, {  useContext, useState } from "react";
import { useNotification } from "../../../context/NotificationProvider";
import { useAuth } from "../../../context/AuthsProvider";
import { ContextAccount } from "../../../context/AccountProvider";

const inner = {email: "", password: ""}
function FormLogin({ onClose }) {
  const [login, setLogin] = useState(inner)
  const [error, setError] = useState(inner)
  const showNotification = useNotification();
  const accounts = useContext(ContextAccount);
 
  const { handleLogin } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };
  
  const validationForm = () => {
    const newError = {};
      newError.email = login.email ? "" : "Muc khong de trong";
      newError.password = login.password ? "" : "Muc khong de trong";
    
    setError(newError);
    return Object.values(newError).every((e) => e === "");
  };

  const handleSave = async () => {
    if (!validationForm()) {
      return;
    }
    const checkEP = accounts.find(e => e.email === login.email && e.password === login.password);
    if(!checkEP) {
      showNotification('Mat khau hoac tai khoan ko ton tai!', "error");
      return ;
    }
    showNotification('Login successfully!', "success");
    setLogin(inner);
    handleLogin(checkEP);
    onClose();
  };



  return (
    <div className="flex flex-col gap-3">
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
      <div className="text-sm text-pink-600 hover:underline cursor-pointer">
        Forgot password?
      </div>
      <button onClick={handleSave} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md font-semibold">
        Login
      </button>
    </div>
  );
}

export default FormLogin;
