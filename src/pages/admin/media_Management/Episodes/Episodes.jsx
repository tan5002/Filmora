import React, { useContext, useState } from "react";
import AdminHeader from "../../../../components/admin/AdminHeader";
import ModalEpisode from "./ModalEpisode";
import {
  addDocument,
  updateDocument,
} from "../../../../services/firebaseResponse";
import TableEpisodes from "./TableEpisode";
import { useNotification } from "../../../../context/NotificationProvider";
import { ContextMovie } from "../../../../context/MovieProvider";
const inner = {
  episodeNumber: "",
  episodeUrl: "",
  idMovie: "",
  seasonId: "",
  date: new Date(),
};
function Episodes() {
  const [open, setOpen] = useState(false);
  const [episode, setEpisode] = useState(inner);
  const [error, setError] = useState(inner);
  const [search, setSearch] = useState("");
  const movies = useContext(ContextMovie)
  const showNotification = useNotification();
  const handleOpen = () => {
    setOpen(true);
    setEpisode(inner);
    setError(inner);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = async () => {
    if (!validationForm()) {
      return;
    }

    if (episode.id) {
      await updateDocument("Episodes", episode);
      showNotification("Chỉnh sửa thành công!", "success");
    } else {
      await addDocument("Episodes", episode);
      showNotification("Thêm thành công!", "success");
    }
    handleClose();
  };
  const validationForm = () => {
    const newError = {};
    const selectedMovie = movies.find((m) => m.id === episode.idMovie);

    newError.episodeNumber = episode.episodeNumber
      ? ""
      : "Enter episodes number";
    newError.episodeUrl = episode.episodeUrl ? "" : "Enter episodes URL";
    newError.idMovie = episode.idMovie ? "" : "Enter movie";

    if (selectedMovie?.isSeries === "Phim bộ") {
      newError.seasonId = episode.seasonId ? "" : "Enter season";
    } else {
      newError.seasonId = ""; 
    }

    setError(newError);
    return Object.values(newError).every((e) => e === "");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <AdminHeader
        title={" List Episodes"}
        name={"Add Episodes"}
        handleOpen={handleOpen}
        handleSearch={handleSearch}
      />
      <ModalEpisode
        open={open}
        episode={episode}
        setEpisode={setEpisode}
        handleClose={handleClose}
        handleSave={handleSave}
        error={error}
      />
      <TableEpisodes
        handleOpen={handleOpen}
        setEpisodes={setEpisode}
        episodes={episode}
        search={search}
      />
    </div>
  );
}

export default Episodes;
