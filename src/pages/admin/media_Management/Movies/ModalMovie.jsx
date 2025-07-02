import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { ContextAuthor } from "../../../../context/AuthorProvider";
import { ContextActor } from "../../../../context/ActorProvider";
import { ContextCharacter } from "../../../../context/CharacterProvider";
import { FaDropbox, FaUser, FaUsers } from "react-icons/fa";
import ModalChoose from "./ModalChoose";
import { ContextCategories } from "../../../../context/CategoryProvider";
import { ContextPlans } from "../../../../context/PlanProvider";
import { getOjectById } from "../../../../services/convertFunction";
import { MdCancel } from "react-icons/md";
const AddMovieModal = ({
  open,
  handleClose,
  movie,
  setMovie,
  error,
  handleSave,
}) => {
  const authors = useContext(ContextAuthor);
  const actors = useContext(ContextActor);
  const characters = useContext(ContextCharacter);
  const categories = useContext(ContextCategories);
  const plans = useContext(ContextPlans);
  const [dataChoose, setDataChoose] = useState([]);
  const [openCate, setOpenCate] = useState(false);
  const [typeChoose, setTypeChoose] = useState("");
  const [search, setSearch] = useState("");
  const handleOpenCate = () => {
    setOpenCate(true);
  };

  console.log(characters);

  const handleChoose = (type) => {
    setTypeChoose(type);
    switch (type) {
      case "categories":
        setDataChoose(categories);
        break;
      case "characters":
        setDataChoose(characters);
        break;
      case "actors":
        setDataChoose(actors);
        break;
      default:
        setDataChoose([]);
        break;
    }
    handleOpenCate();
  };

  const selectChoose = (id, typeChoose) => {
    switch (typeChoose) {
      case "categories":
        setMovie((pre) => ({
          ...pre,
          listCate: toggleId(id, pre.listCate),
        }));
        break;
      case "actors":
        setMovie((pre) => ({
          ...pre,
          listActor: toggleId(id, pre.listActor),
        }));
        break;
      case "characters":
        setMovie((pre) => ({
          ...pre,
          listChar: toggleId(id, pre.listChar),
        }));
        break;
      default:
        break;
    }
  };

  const toggleId = (id, data) => {
    return data.includes(id) ? data.filter((e) => e !== id) : [...data, id];
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMovie({ ...movie, imgUrl: reader.result, oldImgUrl: movie.imgUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const onCloseChoose = () => {
    setOpenCate(false);
    setSearch("");
  };
  const dataSelect = () => {
    switch (typeChoose) {
      case "categories":
        return movie.listCate;
      case "characters":
        return movie.listChar;
      case "actors":
        return movie.listActor;
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle color="primary">
          {movie.id ? "Update Movie" : "Add Movie"}
        </DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-2 gap-3">
            <div className="max-md:col-span-2 col-span-1">
              <TextField
                label="Name"
                fullWidth
                name="name"
                margin="normal"
                onChange={handleChange}
                value={movie.name}
                helperText={error.name}
                error={!!error.name}
              />
              <TextField
                label="Description"
                name="description"
                value={movie.description}
                onChange={handleChange}
                helperText={error.description}
                error={!!error.description}
                fullWidth
                multiline
                rows={3}
                margin="normal"
              />
              <TextField
                label="Duration (in minutes)"
                name="duration"
                value={movie.duration}
                onChange={handleChange}
                helperText={error.duration}
                error={!!error.duration}
                type="number"
                fullWidth
                margin="normal"
              />
              <Autocomplete
                fullWidth
                name="author"
                value={authors.find((e) => e.id === movie.author) || null}
                onChange={(e, value) => {
                  handleChange({
                    target: { name: "author", value: value ? value.id : "" },
                  });
                }}
                options={authors}
                getOptionLabel={(option) => option.name} // 👈 hiển thị name
                isOptionEqualToValue={(option, value) => option.id === value.id} // 👈 quan trọng khi dùng object
                sx={{ marginBottom: "10px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm hoặc chọn tác giả"
                    helperText={error.author}
                    error={!!error.author}
                  />
                )}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Plan</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="plan"
                  label="Chon goi dang ky"
                  value={movie.plan}
                  margin="normal"
                  helperText={error.plan}
                  error={!!error.plan}
                  onChange={handleChange}
                >
                  {plans.map((plan) => (
                    <MenuItem key={plan.level} value={plan.id}>
                      {plan.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Rent"
                type="number"
                name="rent"
                value="rent"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 max-md:col-span-2">
              <Typography
                onClick={() => handleChoose("categories")}
                fontWeight="bold"
                gutterBottom
                display={"flex"}
                alignItems={"center"}
              >
                <div className="flex items-center gap-3 bg-[#30cfd0] p-2 rounded-[9px] cursor-pointer">
                  Categories
                  <FaDropbox />
                </div>
              </Typography>
              <Grid container spacing={1} marginBottom={2}>
                {movie.listCate.map((cate) => (
                  <Grid item key={cate} position={"relative"}>
                    <Button
                      sx={{
                        m: 0.5,
                        color: "white",
                      }}
                      variant={"contained"}
                      size="small"
                    >
                      {getOjectById(categories, cate)?.name}
                    </Button>
                    <MdCancel
                      onClick={() => selectChoose(cate, "categories")}
                      className="absolute -top-[7px] -left-[7px] hover:text-red-600"
                    />
                  </Grid>
                ))}
                {
                  error.listCate && (
                    <Grid item xs={12}>
                        <span className="text-[#CD5C5C]">{error.listCate}</span>
                    </Grid>
                  )
                }
              </Grid>
              {/* Actors */}
              <Typography
                onClick={() => handleChoose("actors")}
                fontWeight="bold"
                gutterBottom
                display={"flex"}
                alignItems={"center"}
              >
                <div className="flex items-center gap-3 bg-[#30cfd0] p-2 rounded-[9px] cursor-pointer">
                  Actor
                  <FaUser />
                </div>
              </Typography>
              <Grid container spacing={1} marginBottom={2}>
                {movie.listActor.map((actor) => (
                  <Grid item key={actor} position={"relative"}>
                    <Avatar src={getOjectById(actors, actor)?.imgUrl} />
                    <MdCancel
                      onClick={() => selectChoose(actor, "actors")}
                      className="absolute -top-[7px] -left-[7px]  hover:text-red-600"
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Characters */}
              <Typography
                onClick={() => handleChoose("characters")}
                fontWeight="bold"
                gutterBottom
                display={"flex"}
                alignItems={"center"}
              >
                <div className="flex items-center gap-3 bg-[#30cfd0] p-2 rounded-[9px] cursor-pointer">
                  Character
                  <FaUsers />
                </div>
              </Typography>
              <Grid container spacing={1} marginBottom={2}>
                {movie.listChar.map((item) => (
                  <Grid item key={item} position={"relative"}>
                    <Avatar src={getOjectById(characters, item)?.imgUrl} />
                    <MdCancel
                      onClick={() => selectChoose(item, "characters")}
                      className="absolute -top-[7px] -left-[7px]  hover:text-red-600"
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Upload Image */}
              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                component="label"
                onChange={handleFileChange}
              >
                Upload Image
                <input type="file" hidden />
              </Button>
              {movie.imgUrl && (
                <div className="mt-2 flex justify-center ">
                  <img
                    src={movie.imgUrl}
                    alt=""
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      marginTop: 8,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {movie.id ? "Update" : "Add "}
          </Button>
        </DialogActions>
      </Dialog>
      <ModalChoose
        dataSelect={dataSelect()}
        selectChoose={selectChoose}
        typeChoose={typeChoose}
        openCate={openCate}
        onCloseChoose={onCloseChoose}
        dataChoose={dataChoose}
        search={search}
        setSearch={setSearch}
        error={error}
      />
    </>
  );
};

export default AddMovieModal;
