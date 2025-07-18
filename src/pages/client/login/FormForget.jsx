import { TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function FormForget({setForget}) {
  return (
    <div>
      <TextField
        fullWidth
        name=""
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
      <button
        onClick={() => setForget(false)}
        className="text-sm text-pink-400 hover:underline mt-4 text-center block mx-auto"
      >
        ← Quay lại đăng nhập
      </button>
    </div>
  );
}

export default FormForget;
