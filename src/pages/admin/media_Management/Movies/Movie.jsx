import React, { useState } from "react";
import AdminHeader from "../../../../components/admin/AdminHeader";
import ModalMovie from "./ModalMovie";
import TableMovie from "./TableMovie";
import LOGO from "../../../../assets/logo.png";
import {
  addDocument,
  updateDocument,
} from "../../../../services/firebaseResponse";
import {useNotification} from "../../../../context/NotificationProvider"
const inner = {
  name: "",
  description: "",
  duration: "",
  plan: "",
  rent: 0,
  author: "",
  listCate: [],
  listActor: [],
  listChar: [],
  imgUrl: LOGO,
  oldImgUrl: "",
  date: new Date(),
  isSeries: "",
};
function Movie() {
  const [open, setOpen] = useState(false);
  const [movie, setMovie] = useState(inner);
  const [error, setError] = useState(inner);
  const [search, setSearch] = useState("")
  const showNotification = useNotification();

  const handleOpen = () => {
    setOpen(true);
    setMovie(inner);
    setError(inner);
  };
  console.log(movie);
  
  const handleSave = async () => {
    if (!validationForm()) {
      return;
    }
    if (movie.id) {
      await updateDocument("Movies", movie);
      showNotification('Chỉnh sửa thành công!', "success");
    } else {
      await addDocument("Movies", movie);
      showNotification('Thêm thành công!', "success");
    }
    handleClose();
  };
  const validationForm = () => {
    const newError = {};
    newError.name = movie.name ? "" : "Enter name movie";
    newError.description = movie.description ? "" : "Enter description";
    newError.duration = movie.duration ? "" : "Enter duration";
    newError.plan = movie.plan ? "" : "Enter plan";
    newError.listCate = movie.listCate.length > 0 ? "" : "Choose a Category";
    newError.author = movie.author ? "" : "Choose author";
    newError.isSeries = movie.isSeries ? "" : "Choose series";
    setError(newError);
    return Object.values(newError).every((e) => e === "");
  };
  const handleClose = () => setOpen(false);
  const handleSearch = (e) => {
    setSearch(e.target.value )
  }
  return (
    <div>
      <AdminHeader
        title={" List Movies"}
        name={" Add Movies"}
        handleOpen={handleOpen}
        handleSearch={handleSearch}
      />
      <ModalMovie
        open={open}
        handleClose={handleClose}
        movie={movie}
        setMovie={setMovie}
        error={error}
        handleSave={handleSave}
      />
      <TableMovie handleOpen={handleOpen} setMovie={setMovie} movie={movie} search={search} />
    </div>
  );
}

export default Movie;
