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
function ModalCharacter({
  open,
  handleClose,
  character,
  setCharacter,
  handleSave,
  error,
}) {
  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCharacter({
          ...character,
          imgUrl: reader.result,
          oldImgUrl: character.imgUrl,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {character.id ? "Update Character" : "Add Character"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Name"
              name="name"
              value={character.name}
              onChange={handleChange}
              helperText={error.name}
              error={!!error.name}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={character.description}
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
            {character.imgUrl && (
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={character.imgUrl}
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
            {character.id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalCharacter;
