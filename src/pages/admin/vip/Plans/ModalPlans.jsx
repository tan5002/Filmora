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

const ModalPlans = ({ open, handleClose, plan, handleSave, setPlan, error }) => {

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPlan((prev) => ({...prev, [name]: value}))
    }
   
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{plan.id ? "Update Plan" : "Add Plan" } </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
        <TextField
            label="Title"
            name="title"
            value={plan.title}
            onChange={handleChange}
            helperText={error.title}
            error={!!error.title}
            multiline
            fullWidth
          />
          <TextField
            label="Level"
            name="level"
            value={plan.level}
            onChange={handleChange}
            helperText={error.level}
            error={!!error.level}
            fullWidth
          />
          <TextField
          type='number'
            label="Price Month"
            name="priceMonth"
            value={plan.priceMonth}
            onChange={handleChange}
            helperText={error.priceMonth}
            error={!!error.priceMonth}
            fullWidth
          />
          
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button  color="primary" onClick={handleSave}>
         {plan.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPlans;
