import React, { useState } from "react";
import AdminHeader from "../../../../components/admin/AdminHeader";
import ModalSeason from "./ModalSeason";
import {
  addDocument,
  updateDocument,
} from "../../../../services/firebaseResponse";
import TableSeason from "./TableSeason";
import { useNotification } from "../../../../context/NotificationProvider";
import Logo from "../../../../assets/logo.png"
const inner = { idMovie: "", seasonNumber: "", title: "", date: new Date(), imgUrl: Logo };
function Season() {
  const [open, setOpen] = useState(false);
  const [season, setSeason] = useState(inner);
  const [error, setError] = useState(inner);
  const [search, setSearch] = useState("");
  const showNotification = useNotification();
  const handleOpen = () => {
    setOpen(true);
    setSeason(inner);
    setError(inner);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = async () => {
    if (!validationForm()) {
      return;
    }

    if (season.id) {
      await updateDocument("Seasons", season);
      showNotification("Chỉnh sửa thành công!", "success");
    } else {
      await addDocument("Seasons", season);
      showNotification("Thêm thành công!", "success");
    }
    handleClose();
  };
  const validationForm = () => {
    const newError = {};
    newError.seasonNumber = season.seasonNumber ? "" : "Enter season number";
    newError.title = season.title ? "" : "Enter title ";
    newError.idMovie = season.idMovie ? "" : "Enter id Movie";
    setError(newError);
    return Object.values(newError).every((e) => e === "");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <AdminHeader
        title={" List Season"}
        name={"Add Season"}
        handleOpen={handleOpen}
        handleSearch={handleSearch}
      />
      <ModalSeason
        open={open}
        season={season}
        setSeason={setSeason}
        handleClose={handleClose}
        handleSave={handleSave}
        error={error}
      />
      <TableSeason
        handleOpen={handleOpen}
        setSeason={setSeason}
        season={season}
        search={search}
      />
    </div>
  );
}

export default Season;
