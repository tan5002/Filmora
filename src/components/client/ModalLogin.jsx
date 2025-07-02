import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  DialogActions,
  Divider,
  Stack,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
function ModalLogin({ open, handleClose }) {
  const [tab, setTab] = useState("login");
  return (
    <div>
      return (
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle textAlign="center">
          {tab === "login" ? "Đăng Nhập" : "Đăng Ký"}
        </DialogTitle>

        <Tabs  centered>
          <Tab label="Đăng nhập" onClick={() => setTab("login")}/>
          <Tab label="Đăng ký"  onClick={() => setTab("signin")}/>
        </Tabs>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {tab === "signin" && (
              <>
                <TextField label="Tên đăng nhập" name="username" fullWidth />
                <TextField label="Họ tên" name="name" fullWidth />
              </>
            )}
            <TextField label="Email" name="email" type="email" fullWidth />
            <TextField
              label="Mật khẩu"
              name="password"
              type="password"
              fullWidth
            />
          </Box>

          <Divider sx={{ my: 3 }}>hoặc đăng nhập bằng</Divider>

          <Stack spacing={1.5}>
            <Button variant="outlined" fullWidth startIcon={<FcGoogle />} className="hover:bg-blue-500">
              Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<FaFacebookF/>}
              className="hover:text-black"
            >
              Facebook
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<FaInstagram className="text-[#E1306C]"/>}
            >
              Instagram
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="contained" color="primary" fullWidth>
            {tab === "login" ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </DialogActions>
      </Dialog>
      );
    </div>
  );
}

export default ModalLogin;
