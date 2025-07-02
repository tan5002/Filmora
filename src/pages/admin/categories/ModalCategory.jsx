import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from '@mui/material';

const ModalCategory = ({ open, handleClose, category, handleSave, setCategory, error }) => {

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategory((prev) => ({...prev, [name]: value}))
    }
   
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{category.id ? "Update Category" : "Add Category" } </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={category.name}
            onChange={handleChange}
            helperText={error.name}
            error={!!error.name}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={category.description}
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
        <Button  color="primary" onClick={handleSave}>
         {category.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCategory;
