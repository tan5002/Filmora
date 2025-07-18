import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaBell, FaBars, FaTimes, FaList } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthsProvider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { ContextMovie } from "../../context/MovieProvider";
import { ContextAuthor } from "../../context/AuthorProvider";
import { getOjectById } from "../../services/convertFunction";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

function Header({ openLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const handleSearch = () => {
    clickInsideOption.current = true; // ⚠️ đánh dấu đã click option
    setSearch(!search);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !clickInsideOption.current // ✅ KHÔNG đóng nếu vừa click chọn option
      ) {
        setSearch(false);
      }
    };

    if (search) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);
  const movies = useContext(ContextMovie);
  const authors = useContext(ContextAuthor);
  const { isLogin } = useAuth();
  const { logout } = useAuth();
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const clickInsideOption = useRef(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (e, id) => {
    console.log("VSVS");
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <header className="text-white max-sm:flex-col bg-black/50 shadow-md px-4 sm:px-6 py-3 flex min-sm:gap-10 items-center justify-between flex-wrap fixed z-100 w-full">
        {/* Logo & Brand */}
        <div className="flex items-center max-sm:justify-between max-sm:w-full gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-[100px] rounded-[25px] object-cover"
          />
          <div className="sm:hidden">
            <div className="w-[80px] text-end">
              <button onClick={toggleMenu} className="text-2xl">
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full flex-1  justify-between sm:flex sm:items-center sm:gap-6 sm:w-auto text-center mt-3 sm:mt-0`}
        >
          <ul className="min-sm:flex gap-3 ">
            <Link
              to="/#"
              className="block py-2 sm:py-0  font-medium hover:text-blue-600"
            >
              Trang chủ
            </Link>
            <Link
              to="/phimbo"
              className="block py-2 sm:py-0  font-medium hover:text-blue-600"
            >
              Phim bộ
            </Link>
            <Link
              to="/#"
              className="block py-2 sm:py-0 font-medium hover:text-blue-600"
            >
              Phim lẻ
            </Link>
            <Link
              to="/#"
              className="block py-2 sm:py-0 font-medium hover:text-blue-600"
            >
              Anime
            </Link>
            <Link
              to="/favorite"
              className="block py-2 sm:py-0 font-medium hover:text-blue-600"
            >
              Phim yêu thích
            </Link>
          </ul>

          <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-3 mt-3 sm:mt-0">
            {search ? (
              <Stack
                spacing={2}
                sx={{
                  width: 300,
                  animation: "slideIn 1s ease-out",
                  "@keyframes slideIn": {
                    from: {
                      transform: "translateX(-100px)",
                      width: "0",
                    },
                    to: {
                      transform: "translateX(0)",
                      width: "300px",
                    },
                  },
                }}
              >
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={movies}
                  getOptionLabel={(option) => option.name}
                  onInputChange={(event, newInputValue) => {
                    const matchedMovie = movies.find(
                      (movie) => movie.name === newInputValue
                    );
                    if (matchedMovie) {
                      handleNavigate(event, matchedMovie.id); // Truyền ID vào hàm xử lý
                    }
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <img
                        src={option.imgUrl}
                        alt={option.name}
                        style={{
                          width: 40,
                          height: 40,
                          marginRight: 10,
                          borderRadius: 4,
                        }}
                      />
                      <div>
                        <p>{option.name}</p>
                        <p className="text-sm text-gray-400">
                          tác giả: {getOjectById(authors, option.author)?.name}
                        </p>
                      </div>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      onChange={handleNavigate}
                      {...params}
                      label="Search movie"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "white" },
                          "&:hover fieldset": { borderColor: "white" },
                          "&.Mui-focused fieldset": { borderColor: "white" },
                        },
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                        input: { color: "white" },
                      }}
                    />
                  )}
                />
              </Stack>
            ) : (
              <IoSearch
                className="text-xl sm:text-2xl cursor-pointer"
                onClick={handleSearch}
              />
            )}

            <FaBell className="text-xl sm:text-2xl cursor-pointer" />
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {isLogin ? (
                  <>
                    <Link
                      to="/plans"
                      className="border-2 border-solid border-white bg-black/50 px-3 py-2 rounded-2xl hover:bg-white/50 hover:text-black hover:font-bold  "
                    >
                      Đăng kí gói
                    </Link>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        {isLogin.imgUrl ? (
                          <img
                            className="w-10 h-10 rounded-full object-cover"
                            alt="Avatar"
                            src={isLogin.imgUrl}
                          />
                        ) : (
                          <RxAvatar className="text-4xl text-white hover:text-blue-500" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <Link
                    onClick={openLogin}
                    className="text-white btn-login font-bold px-4 sm:px-6 py-2 rounded-full shadow-md transition text-sm sm:text-base"
                  >
                    Đăng nhập
                  </Link>
                )}
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose} className="flex gap-2">
                  {isLogin?.imgUrl ? (
                    <img
                      src={isLogin?.imgUrl}
                      alt={isLogin?.useName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar />
                  )}
                  {isLogin?.email}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <FaList fontSize="small" />
                  </ListItemIcon>
                  Movie Libraries Management
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <Link
                  to="/setting"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    My Account
                  </MenuItem>
                </Link>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
