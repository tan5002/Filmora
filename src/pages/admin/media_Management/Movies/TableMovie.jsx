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
  Tooltip,
} from "@mui/material";
import { ContextMovie } from "../../../../context/MovieProvider";
import { deleteDocument } from "../../../../services/firebaseResponse";
import ModalDelete from "../../../../components/admin/ModalDelete";
import { FaEdit, FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getOjectById } from "../../../../services/convertFunction";
import { ContextAuthor } from "../../../../context/AuthorProvider";
import { ContextCategories } from "../../../../context/CategoryProvider";
import { IoGrid } from "react-icons/io5";
import { ContextCharacter } from "../../../../context/CharacterProvider";
import { ContextActor } from "../../../../context/ActorProvider";
import { FaUsersBetweenLines } from "react-icons/fa6";
function TableMovie({ handleOpen, setMovie, movie, search }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const movies = useContext(ContextMovie);
  const [open, setOpen] = useState(false);
  const authors = useContext(ContextAuthor);
  const categories = useContext(ContextCategories);
  const actors = useContext(ContextActor);
  const characters = useContext(ContextCharacter);

  const filterMovie = movies.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (row) => {
    handleOpen();
    setMovie(row);
  };

  const handleDelete = (row) => {
    setOpen(true);
    setMovie(row);
  };

  const submitDeleted = async () => {
    await deleteDocument("Movies", movie);
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedMovies = filterMovie.slice(
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
                Duration
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "gray", fontWeight: "bold" }}
              >
                Author
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "gray", fontWeight: "bold", whiteSpace: "nowrap" }}
              >
                List Category
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "gray", fontWeight: "bold", whiteSpace: "nowrap" }}
              >
                List Actor
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "gray", fontWeight: "bold", whiteSpace: "nowrap" }}
              >
                List Character
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "gray", fontWeight: "bold",whiteSpace: "nowrap"}}
              >
                Thể loại phim
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
            {paginatedMovies.map((row, index) => (
              <TableRow key={index} className="hover:bg-white/30">
                <TableCell component="th" scope="row" sx={{ color: "white" }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="left">
                  <img src={row.imgUrl} className="w-12 h-auto" />
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.description.length > 30
                    ? row.description.slice(0, 30) + "..."
                    : row.description}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.duration}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {getOjectById(authors, row.author)?.name}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.isSeries}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  <Tooltip
                    title={row.listCate.map((item) => (
                      <p key={item}>{getOjectById(categories, item)?.name}</p>
                    ))}
                    arrow
                  >
                    <IoGrid className="text-3xl" />
                  </Tooltip>
                </TableCell>

                <TableCell align="center" sx={{ color: "white" }}>
                  <Tooltip
                    title={row.listActor.map((item) => (
                      <p key={item}>{getOjectById(actors, item)?.name}</p>
                    ))}
                    arrow
                  >
                    <FaUsers className="text-3xl" />
                  </Tooltip>
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  <Tooltip
                    title={row.listChar.map((item) => (
                      <p key={item}>{getOjectById(characters, item)?.name}</p>
                    ))}
                    arrow
                  >
                    <FaUsersBetweenLines className="text-3xl" />
                  </Tooltip>
                </TableCell>

                <TableCell align="left" sx={{ whiteSpace : "nowrap"}}>
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
        rowsPerPageOptions={[5,10, 25]}
        component="div"
        count={filterMovie.length}
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

export default TableMovie;
