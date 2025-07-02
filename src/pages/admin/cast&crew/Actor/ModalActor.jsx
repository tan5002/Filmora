import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
function ModalActor({ open, handleClose, actor, setActor, handleSave, error }) {
  const handleChange = (e) => {
    setActor({ ...actor, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setActor({ ...actor, imgUrl: reader.result , oldImgUrl: actor.imgUrl });
        };
        reader.readAsDataURL(file);
    }        
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{actor.id ? "Update Actor" : "Add Actor"}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Name"
              name="name"
              value={actor.name}
              onChange={handleChange}
              helperText={error.name}
              error={!!error.name}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={actor.description}
              onChange={handleChange}
              helperText={error.description}
              error={!!error.description}
              multiline
              rows={3}
              fullWidth
            />
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {actor.imgUrl && (
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={(actor.imgUrl)}
                  alt="Preview"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    marginTop: 8,
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            {actor.id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalActor;
