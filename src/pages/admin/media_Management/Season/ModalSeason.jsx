import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Autocomplete,
} from "@mui/material";
import { ContextMovie } from "../../../../context/MovieProvider";
import { IoMdCloudUpload } from "react-icons/io";
function ModalSeason({
  setSeason,
  handleClose,
  handleSave,
  season,
  error,
  open,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeason((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSeason({
          ...season,
          imgUrl: reader.result,
          oldImgUrl: season.imgUrl,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const movieId = useContext(ContextMovie);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {season.id ? "Update seasons" : "Add seasons"}{" "}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <Autocomplete
              fullWidth
              value={movieId.find((e) => e.id === movieId.idMovie) || null}
              onChange={(e, value) => {
                handleChange({
                  target: { name: "idMovie", value: value ? value.id : "" },
                });
              }}
              options={movieId}
              getOptionLabel={(option) => option.name} // 👈 hiển thị name
              isOptionEqualToValue={(option, value) =>
                option.idMovie === value.idMovie
              } // 👈 quan trọng khi dùng object
              sx={{ marginBottom: "10px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Id Movie"
                  helperText={error.idMovie}
                  error={!!error.idMovie}
                />
              )}
            />
            <TextField
              label="season Number"
              name="seasonNumber"
              type="number"
              value={season.seasonNumber}
              onChange={handleChange}
              helperText={error.seasonNumber}
              error={!!error.seasonNumber}
              multiline
              fullWidth
            />
            <TextField
              label="Title"
              name="title"
              value={season.title}
              onChange={handleChange}
              helperText={error.title}
              error={!!error.title}
              fullWidth
            />
          </Box>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            component="label"
            onChange={handleFileChange}
            tabIndex={-1}
            startIcon={<IoMdCloudUpload />}
          >
            Upload Image
            <input type="file" hidden />
          </Button>
          {season.imgUrl && (
            <div className="mt-2 flex justify-center ">
              <img
                src={season.imgUrl}
                alt=""
                style={{
                  height: 100,
                  objectFit: "cover",
                  marginTop: 8,
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            {season.id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalSeason;
