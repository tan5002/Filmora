import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ModalDelete = ({ open, submitDeleted, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-delete-dialog-title"
      aria-describedby="confirm-delete-dialog-description"
    >
      <DialogTitle id="confirm-delete-dialog-title">Xác nhận xóa</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-delete-dialog-description">
          Bạn có chắc chắn muốn xóa mục này?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Hủy
        </Button>
        <Button onClick={submitDeleted} color="error" variant="contained">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
