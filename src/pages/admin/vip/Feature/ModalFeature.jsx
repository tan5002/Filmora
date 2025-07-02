import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ContextPlans } from "../../../../context/PlanProvider";

function ModalFeature({
  open,
  handleClose,
  handleSave,
  feature,
  setFeature,
  error,
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeature((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };
  const plans = useContext(ContextPlans);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{feature.id ? "Update Feature" : "Add Feature"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Plan</InputLabel>
            <Select
              id="demo-simple-select"
              name="planId"
              label="Chon goi dang ky"
              value={feature.planId}
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
          <div className="flex items-center justify-center">
            <FormControlLabel
              control={
                <Checkbox
                  name="available"
                  checked={!!feature.available}
                  onChange={handleChange}
                />
              }
            />

            <TextField
              label="Feature Text"
              name="text"
              value={feature.text || ""}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {feature.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalFeature;
