import React, { useContext, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ContextPlans } from "../../../../context/PlanProvider";
import { deleteDocument } from "../../../../services/firebaseResponse";
import ModalDelete from "../../../../components/admin/ModalDelete";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function TablePlans({ handleOpen, setPlan, plan }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const plans = useContext(ContextPlans);
  const [open, setOpen] = useState(false);

  const handleEdit = (row) => {
    handleOpen();
    setPlan(row);
  };

  const handleDelete = (row) => {
    setOpen(true);
    setPlan(row);
  };
  const submitDeleted = async () => {
    await deleteDocument("Plans", plan);
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedPlans = plans.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  return (
    <div className="p-3">
      <TableContainer component={Paper} 
        sx={{ backgroundColor: "#1c1e26" }}
        >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "gray", fontWeight: "bold" }}>#</TableCell>
              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Title</TableCell>
              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Level</TableCell>
              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Price Month</TableCell>

              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPlans.map((row, index) => (
              <TableRow key={index} className="hover:bg-white/30">
                <TableCell component="th" scope="row"sx={{ color: "white" }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{row.title}</TableCell>
                <TableCell sx={{ color: "white" }}>{row.level}</TableCell>
                <TableCell sx={{ color: "white" }}>{row.priceMonth}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginRight: 2 }}
                    onClick={() => handleEdit(row)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(row)}
                  >
                    <MdDelete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={plans.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: "white",
          "& .MuiTablePagination-toolbar": {
            color: "white",
          },
          "& .MuiInputBase-root": {
            color: "white",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
          "& .MuiTablePagination-selectIcon": {
            color: "white",
          },
        }}
      />
      <ModalDelete
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        submitDeleted={submitDeleted}
      />
    </div>
  );
}

export default TablePlans;
