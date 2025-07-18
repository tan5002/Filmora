import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  TablePagination,
} from "@mui/material";

const allSubscriptions = [
  {
    id: 1,
    plan: "Siêu Việt",
    startDate: "26/3/2025",
    expiryDate: "26/4/2025",
    price: "180.000 đ",
    method: "Credit Card",
    status: "Active",
  },
  {
    id: 2,
    plan: "Siêu Việt",
    startDate: "20/2/2025",
    expiryDate: "20/3/2025",
    price: "180.000 đ",
    method: "Credit Card",
    status: "Expired",
  },
  {
    id: 3,
    plan: "Di Động",
    startDate: "17/11/2024",
    expiryDate: "17/5/2025",
    price: "432.000 đ",
    method: "Credit Card",
    status: "Active",
  },
  {
    id: 4,
    plan: "Siêu Việt",
    startDate: "12/12/2024",
    expiryDate: "12/6/2025",
    price: "1.020.000 đ",
    method: "Credit Card",
    status: "Active",
  },
  {
    id: 5,
    plan: "Siêu Việt",
    startDate: "26/12/2024",
    expiryDate: "26/1/2025",
    price: "180.000 đ",
    method: "Credit Card",
    status: "Expired",
  },
  {
    id: 6,
    plan: "Siêu Việt",
    startDate: "26/3/2025",
    expiryDate: "26/4/2025",
    price: "180.000 đ",
    method: "Credit Card",
    status: "Active",
  },
  {
    id: 7,
    plan: "Siêu Việt",
    startDate: "26/3/2025",
    expiryDate: "26/4/2025",
    price: "180.000 đ",
    method: "Credit Card",
    status: "Active",
  },
];

export default function ManagePlans() {
  const [page, setPage] = useState(0); // starts from 0
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Cắt dữ liệu hiển thị cho trang hiện tại
  const paginatedData = allSubscriptions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset về trang đầu
  };

  return (
    <div className="shadow-plan">
      <Box p={3}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Rented Movies
        </Typography>

        <TableContainer component={Paper}>
          <Table
            sx={{
              background: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: 1,
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "#1e293b", // nền đen/xám đậm
                "& th": {
                  color: "white",
                  fontWeight: "bold",
                },
              }}
            >
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((e, i) => (
                <TableRow
                  key={e.id}
                  sx={{
                    backgroundColor: i % 2 === 0 ? "#1e293b" : "#334155", // row striping
                    "& td": {
                      color: "white",
                    },
                  }}
                >
                  <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                  <TableCell>{e.plan}</TableCell>
                  <TableCell>{e.startDate}</TableCell>
                  <TableCell>{e.expiryDate}</TableCell>
                  <TableCell>{e.price}</TableCell>

                  {/* Method Button */}
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      sx={{
                        backgroundColor: "#3b82f6", // blue-500
                        textTransform: "none",
                        fontWeight: 500,
                        px: 2,
                      }}
                    >
                      {e.method}
                    </Button>
                  </TableCell>

                  {/* Status Button */}
                  <TableCell>
                    <button
                      className={`border px-3 py-2 rounded-[5px] ${
                        e.status === "Active"
                          ? "border-red-600 hover:bg-red-400 hover:text-white"
                          : "border-green-600 hover:bg-green-400 hover:text-white"
                      }`}
                    >
                      {e.status}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={allSubscriptions.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]}
            labelRowsPerPage=""
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} of ${count}`
            } // Giữ phần hiển thị range
          />
        </TableContainer>
      </Box>
    </div>
  );
}
