import React, { useContext, useState } from "react";
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
import Paper from "@mui/material/Paper";
import { ContextCharacter } from "../../../../context/CharacterProvider";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalDelete from "../../../../components/admin/ModalDelete";
import { deleteDocument } from "../../../../services/firebaseResponse";

function TableCharacter({ handleOpen, setCharacter, character, search }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const characters = useContext(ContextCharacter);

  const newList = characters.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  const [open, setOpen] = useState(false);
  const handleDelete = (row) => {
    setOpen(true);
    setCharacter(row);
  };
  const submitDeleted = async () => {
    await deleteDocument("Characters", character);
    setOpen(false);
  };
  const handleEdit = (row) => {
    handleOpen();
    setCharacter(row);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedCharacters = newList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div className="px-3">
      <TableContainer component={Paper} sx={{ backgroundColor: "#0B1739" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: "gray", width: "80px", fontWeight: "bold" }}
              >
                #
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Image
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
            {paginatedCharacters.map((row, index) => (
              <TableRow key={index} className="hover:bg-white/30">
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "white", fontWeight: 500 }}
                >
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="left">
                  <img src={row.imgUrl} alt="Product" className="w-[50px] h-[50px] object-cover rounded-full" />
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontWeight: 500 }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontWeight: 500 }}
                >
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
        handleClose={handleClose}
        submitDeleted={submitDeleted}
      />
    </div>
  );
}

export default TableCharacter;
