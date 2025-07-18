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
import { deleteDocument } from "../../../../services/firebaseResponse";
import ModalDelete from "../../../../components/admin/ModalDelete";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ContextSeason } from "../../../../context/SeasonProvider";
import { getOjectById } from "../../../../services/convertFunction";
import { ContextMovie } from "../../../../context/MovieProvider";

function TableSeason({ handleOpen, setSeason, season, search }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const movies = useContext(ContextMovie);  
  const seasons = useContext(ContextSeason);    
  const filterSeason = seasons.filter((e) =>
    getOjectById(movies, e.idMovie).name?.toLowerCase().includes(search?.toLowerCase())
  );

  const handleEdit = (row) => {
    handleOpen();
    setSeason(row);
  };

  const handleDelete = (row) => {
    setOpen(true);
    setSeason(row);
  };
  const submitDeleted = async () => {
    await deleteDocument("Seasons", season);
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedSeason = filterSeason.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div className="p-3">
      <TableContainer component={Paper} sx={{ backgroundColor: "#0B1739" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "gray", fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell
                sx={{ color: "gray", fontWeight: "bold" }}
                align="left"
              >
                Image
              </TableCell>
              <TableCell
                sx={{ color: "gray", fontWeight: "bold" }}
                align="left"
              >
                Name Movie
              </TableCell>
              <TableCell
                sx={{ color: "gray", fontWeight: "bold" }}
                align="left"
              >
                Season Number
              </TableCell>
              <TableCell
                sx={{ color: "gray", fontWeight: "bold" }}
                align="left"
              >
                Title
              </TableCell>
              <TableCell
                sx={{ color: "gray", fontWeight: "bold" }}
                align="left"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSeason.map((row, index) => (
              <TableRow key={index} className="hover:bg-white/30">
                <TableCell sx={{ color: "white" }} component="th" scope="row">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="left">
                  <img src={row.imgUrl} className="w-12 h-auto" />
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {getOjectById(movies, row.idMovie)?.name}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {row.seasonNumber}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{row.title}</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
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
        count={filterSeason.length}
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

export default TableSeason;
