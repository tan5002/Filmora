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
import { ContextSeason } from "../../../../context/SeasonProvider";

function ModalEpisode({
  setEpisode,
  handleClose,
  handleSave,
  episode,
  error,
  open,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEpisode((prev) => ({ ...prev, [name]: value }));
  };

  const movies = useContext(ContextMovie);
  const seasons = useContext(ContextSeason);
  const selectedMovie = movies.find((e) => e.id === episode.idMovie);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{episode.id ? "Update episode" : "Add episode"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Episode Number"
            name="episodeNumber"
            value={episode.episodeNumber}
            onChange={handleChange}
            helperText={error.episodeNumber}
            error={!!error.episodeNumber}
            fullWidth
          />
          <TextField
            label="Episode URL"
            name="episodeUrl"
            value={episode.episodeUrl}
            onChange={handleChange}
            helperText={error.episodeUrl}
            error={!!error.episodeUrl}
            fullWidth
          />

          {/* Movie select */}
          <Autocomplete
            fullWidth
            value={movies.find((m) => m.id === episode.idMovie) || null}
            onChange={(e, value) =>
              handleChange({
                target: { name: "idMovie", value: value ? value.id : "" },
              })
            }
            options={movies}
            getOptionLabel={(option) => option.name || "No name"}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Movie"
                helperText={error.idMovie}
                error={!!error.idMovie}
              />
            )}
          />

          {/* Season select */}
          {selectedMovie?.isSeries === "Phim bộ" && (
            <Autocomplete
              fullWidth
              value={seasons.find((e) => e.id === episode.seasonId) || null}
              onChange={(e, value) => {
                handleChange({
                  target: { name: "seasonId", value: value ? value.id : "" },
                });
              }}
              options={seasons.filter((s) => s.idMovie === episode.idMovie)} // chỉ lấy season của movie được chọn
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ marginBottom: "10px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Season"
                  helperText={error.seasonId}
                  error={!!error.seasonId}
                />
              )}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          {episode.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEpisode;
