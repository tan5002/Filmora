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
import { ContextFeature } from '../../../../context/FeatureProvider';
function TableFeature({ handleOpen, setFeature, feature}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const features = useContext(ContextFeature);
  const listPackage = useContext(ContextPlans)
  const handleEdit = (row) => {
    handleOpen();
    setFeature(row);
  };

  const handleDelete = (row) => {
    setOpen(true);
    setFeature(row);
  };
  const submitDeleted = async () => {
    await deleteDocument("Packages", feature);
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedFeature = features.slice(
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
              <TableCell sx={{ color: "gray", fontWeight: "bold" }}>#</TableCell>
              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Plan</TableCell>
              <TableCell align="left"sx={{ color: "gray", fontWeight: "bold" }}>Text </TableCell>
              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Available</TableCell>
              <TableCell align="left" sx={{ color: "gray", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFeature.map((row, index) => (
              <TableRow  key={index} className="hover:bg-white/30">
                <TableCell component="th" scope="row" sx={{ color: "white"}}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell sx={{ color: "white"}}>{listPackage.find(plan => plan.id === row.planId)?.title}</TableCell>
                <TableCell sx={{ color: "white"}}>{row.text}</TableCell>
                <TableCell sx={{ color: "white"}}>{row.available}</TableCell>
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
              </TableRow >
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={paginatedFeature.length} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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

export default TableFeature;
