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
import {ContextMovie} from "../../../../context/MovieProvider";
function ModalEpisode({
  setEpisode,
  handleClose,
  handleSave,
  episode,
  error,
  open
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEpisode((prev) => ({ ...prev, [name]: value }));
  };
  const movieId = useContext(ContextMovie)
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {episode.id ? "Update episodes" : "Add episodes"}{" "}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Episode Number"
              name="episodeNumber"
              value={episode.episodeNumber}
              onChange={handleChange}
              helperText={error.episodeNumber}
              error={!!error.episodeNumber}
              multiline
              fullWidth
            />
            <TextField
              label="EpisodeUrl"
              name="episodeUrl"
              value={episode.episodeUrl}
              onChange={handleChange}
              helperText={error.episodeUrl}
              error={!!error.episodeUrl}
              fullWidth
            />
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
                isOptionEqualToValue={(option, value) => option.idMovie === value.idMovie} // 👈 quan trọng khi dùng object
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            {episode.id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalEpisode;
