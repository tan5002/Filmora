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
import { ContextPackage } from "../../../../context/PackageProvider";
import { deleteDocument } from "../../../../services/firebaseResponse";
import ModalDelete from "../../../../components/admin/ModalDelete";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ContextPlans } from '../../../../context/PlanProvider';
function TablePackage({ handleOpen, setIsPackage, isPackage }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const listPackage = useContext(ContextPackage);
  const [open, setOpen] = useState(false);
  const plans = useContext(ContextPlans);
  const handleEdit = (row) => {
    handleOpen();
    setIsPackage(row);
  };

  const handleDelete = (row) => {
    setOpen(true);
    setIsPackage(row);
  };
  const submitDeleted = async () => {
    await deleteDocument("Packages", isPackage);
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedPackage = listPackage.slice(
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
            <TableRow className="hover:bg-[#e3f2fd]">
              <TableCell sx={{ color: "gray", width: "80px", fontWeight: "bold" }}>#</TableCell>
              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Time (month)</TableCell>
              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Discount (%)</TableCell>
              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Plan</TableCell>

              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPackage.map((row, index) => (
              <TableRow key={index} className="hover:bg-white/30">
                <TableCell component="th" scope="row" sx={{ color: "white"}}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell sx={{ color: "white"}}>{row.time}</TableCell>
                <TableCell sx={{ color: "white"}}>{row.discount} %</TableCell>
                <TableCell sx={{ color: "white"}}>{plans.find(plan => plan.id === row.planId)?.title}</TableCell>
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
        count={paginatedPackage.length} 
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

export default TablePackage;
