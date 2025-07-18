import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { ContextCategories } from "../../../context/CategoryProvider";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ModalDelete from "../../../components/admin/ModalDelete";
import { deleteDocument } from "../../../services/firebaseResponse";

import TablePagination from "@mui/material/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function TableCategory({ handleOpen, setCategory, category, search }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const categories = useContext(ContextCategories);

  const newList = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (row) => {
    handleOpen();
    setCategory(row);
  };

  const handleDelete = (row) => {
    setOpen(true);
    setCategory(row);
  };

  const submitDeleted = async () => {
    await deleteDocument("Categories", category);
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCategories = newList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-3">
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#0B1739" }}
        className="py-3"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: "gray", width: "80px", fontWeight: "bold" }}
              >
                #
              </TableCell>
              <TableCell
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "white" }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 500 }}>
                  {row.name}
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 500 }}>
                  {row.description}
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 500, whiteSpace : "nowrap" }}>
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
        count={newList.length}
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

export default TableCategory;
