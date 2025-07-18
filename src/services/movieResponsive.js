import { getOjectById } from "./convertFunction";

export const handleClickMovie = (
  isLogin,
  navigate,
  movie,
  subscription,
  plans,
  rentMovie,
  seasonNumber
) => {
  // kiểm tra login
  if (!isLogin) {
    return "Đăng Nhập";
  }
  // check xem gói thuê còn hạn của người dùng có đủ level để xem
  const levelMax = checkExpiryDate(isLogin, subscription, plans);
  const levelMovie = getOjectById(plans, movie?.plan)?.level;

  
  if (levelMovie <= levelMax) {
    navigate(`/watchpage/${movie.id}/${seasonNumber}`);
    return "Xem Phim";
  }

  const checkRent = checkRentMovie(isLogin, rentMovie, movie);

  if (checkRent) {
    navigate(`/watchpage/${movie.id}`);
    return "Xem Phim";
  }

  navigate(`/plans`);
  return "Đăng ký gói";
};

// viết hàm trả về level  cao nhất gói đăng ký còn hạn của người đang login
// idlogin, tat ca data goi dang ky =>
export const checkExpiryDate = (isLogin, data, plans) => {
  const listSub = data?.filter(
    (e) => e.accountId === isLogin.id && e.expiryDate.toDate() > new Date()
  );
  const levelMax = listSub.reduce(
    (level, item) =>
      getOjectById(plans, item.planId)?.level > level
        ? getOjectById(plans, item.planId)?.level
        : level,
    0
  );

  return levelMax;
};

// check xem người dùng có thuê phim này và còn hạn dùng không ?
export const checkRentMovie = (isLogin, rentMovie, movie) => {
  return rentMovie.some(
    (e) =>
      e.idUser === isLogin.id &&
      e.expiryDate < new Date() &&
      e.idMovie === movie.id
  );
};
