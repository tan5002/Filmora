import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Logo from "../../../assets/logoFooterFilmora.png";
import { Dialog, DialogContent, TextField } from "@mui/material";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebaseConfig";
import { ContextAccount } from "../../../context/AccountProvider";
import { ROLES } from "../../../utils/contants";
import { addDocument } from "../../../services/firebaseResponse";
import { useAuth } from "../../../context/AuthsProvider";
import { Navigate } from "react-router-dom";
import { useNotification } from "../../../context/NotificationProvider";


function Login({ open, onClose }) {
  const [tab, setTab] = useState(false);
  const accounts = useContext(ContextAccount);
  const { handleLogin } = useAuth();
  const showNotification = useNotification();
  // Google sign-in
const signInWithGoogle = async () => {
  try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const existingCustomer = accounts.find(a => a.email === user.email);
      let loggedInCustomer;

      if (!existingCustomer) {
          const newCustomer = {
              userName: user.displayName,
              email: user.email,
              imgUrl: user.photoURL,
              role: ROLES.USER,
          };
           const accountNew = await addDocument('Accounts', newCustomer);
          loggedInCustomer = accountNew;
      } else {
          loggedInCustomer = existingCustomer;
      }
      handleLogin(loggedInCustomer);
      showNotification('Login successfully!', "success");
      onClose();
  } catch (error) {
      showNotification('Login failed!', "error", error);
  }
};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ background: "black" }}>
        <div className="flex justify-center">
          <img src={Logo} className="w-1/2" alt="" />
        </div>
        <div className="flex border rounded-lg overflow-hidden mb-6 mt-3">
          <button
            className={`w-1/2 py-2 font-semibold ${
              !tab
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setTab(false)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-semibold ${
              tab
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setTab(true)}
          >
            Signup
          </button>
        </div>
        <div className="space-y-4 text-white flex flex-col gap-2">
          { tab ? <FormRegister setTab={setTab}  /> : <FormLogin onClose={onClose} /> }  
        </div>
        <div className="my-6 text-center text-white">Or login with</div>
        <div className="flex justify-evenly items-center">
          <button onClick={signInWithGoogle} className="flex items-center justify-center gap-2 py-2">
            <FcGoogle className=" text-5xl transform transition duration-300 hover:scale-200 hover:brightness-200" />
          </button>

          <button className=" flex items-center justify-center gap-2 py-2 rounded-md text-[#1877F2]">
            <FaFacebookF className=" text-5xl transform transition duration-300 hover:scale-200 hover:brightness-200" />
          </button>
          <button className=" flex items-center justify-center gap-2 py-2 rounded-md text-[#E1306C]">
            <FaInstagram className=" text-5xl transform transition duration-300 hover:scale-200 hover:brightness-200" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
