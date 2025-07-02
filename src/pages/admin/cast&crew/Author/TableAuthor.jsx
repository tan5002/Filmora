import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ContextAuthor } from "../../../../context/AuthorProvider";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalDelete from "../../../../components/admin/ModalDelete";
import { deleteDocument } from "../../../../services/firebaseResponse";
function TableAuthor({ author, setAuthor, handleOpen, search }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const authors = useContext(ContextAuthor);
  const [open, setOpen] = useState(false);

  const newList = authors.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedAuthors = newList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDelete = (row) => {
    setOpen(true);
    setAuthor(row);
  };
  const submitDeleted = async () => {
    await deleteDocument("Author", author);
    setOpen(false);
  };
  const handleEdit = (row) => {
    handleOpen();
    setAuthor(row);
  };

  return (
    <div className="px-3">
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1c1e26" }}
        className="py-3"
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                #
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Name
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Description
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAuthors.map((row, index) => (
              <TableRow key={index} className="hover:bg-white/30">
                <TableCell component="th" scope="row" sx={{ color: "white" }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.description.length > 30
                    ? row.description.slice(0, 30) + "..."
                    : row.description}
                </TableCell>
                <TableCell align="left">
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

export default TableAuthor;
