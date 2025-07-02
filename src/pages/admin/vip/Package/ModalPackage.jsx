import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ContextPlans } from "../../../../context/PlanProvider";
const ModalPackage = ({
  open,
  handleClose,
  isPackage,
  handleSave,
  setIsPackage,
  error,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsPackage((prev) => ({ ...prev, [name]: value }));
  };
  const plans = useContext(ContextPlans);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isPackage.id ? "Update Package" : "Add Package"}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Time (months)"
            name="time"
            value={isPackage.time}
            onChange={handleChange}
            helperText={error.time}
            error={!!error.time}
            fullWidth
            type="number"
            inputProps={{ min: 1, max: 12 }}
            sx={{ width: '400px' }}
          />
          <TextField
            label="Discount (%)"
            name="discount"
            value={isPackage.discount}
            onChange={handleChange}
            helperText={error.discount}
            error={!!error.discount}
            fullWidth
            type="number"
            inputProps={{ min: 1, max: 12 }}

          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Plan</InputLabel>
            <Select
              id="demo-simple-select"
              name="planId"
              label="Chon goi dang ky"
              value={isPackage.planId}
              margin="normal"
              helperText={error.planId}
              error={!!error.planId}
              onChange={handleChange}
            >
              {plans.map((plan) => (
                <MenuItem key={plan.level} value={plan.id}>
                  {plan.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          {isPackage.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPackage;
