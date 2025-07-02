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
const  ModalAuthor = ({handleClose, author, setAuthor, handleSave, error, open}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{author.id ? "Update Author" : "Add author"}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Name"
              name="name"
              value={author.name}
              onChange={handleChange}
              helperText={error.name}
              error={!!error.name}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={author.description}
              onChange={handleChange}
              helperText={error.description}
              error={!!error.description}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            {author.id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalAuthor;
