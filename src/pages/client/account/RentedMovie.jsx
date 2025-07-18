import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Typography, Box, Avatar
  } from "@mui/material";
  import {   IconButton } from "@mui/material";
  import { HiChevronLeft, HiChevronRight } from "react-icons/hi";   
  export default function RentedMovie({page = 1, totalPages = 5, onChange}) {
    return (
      <Box p={3}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Rented Movies
        </Typography>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell sx={{whiteSpace : "nowrap"}}>Movie Title</TableCell>
                <TableCell sx={{whiteSpace : "nowrap"}}>Rented Date</TableCell>
                <TableCell sx={{whiteSpace : "nowrap"}}>Days Remaining</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src="/poster.jpg"
                    alt="Poster"
                    sx={{ width: 60, height: 80 }}
                  />
                </TableCell>
                <TableCell sx={{whiteSpace : "nowrap"}}>Gặp Lại Chị Bầu</TableCell>
                <TableCell>12/12/2024</TableCell>
                <TableCell>
                  <Box
                    px={1}
                    py={0.5}
                    bgcolor="#FFF3E0"
                    color="#FB8C00"
                    borderRadius={1}
                    fontSize="0.75rem"
                    fontWeight="500"
                    display="inline-block"
                  >
                    0 days
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    px={1}
                    py={0.5}
                    bgcolor="#E3F2FD"
                    color="#1E88E5"
                    borderRadius={1}
                    fontSize="0.75rem"
                    fontWeight="500"
                    display="inline-block"
                  >
                    Rented
                  </Box>
                </TableCell>
                <TableCell>
                  <Button size="small" variant="contained" sx={{ mr: 1 , whiteSpace: "nowrap"}}>
                    View Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Button size="small" variant="text" sx={{whiteSpace : "nowrap"}}>Return Movie</Button>

                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Pagination Placeholder */}
        <Box
      mt={3}
      display="flex"
      justifyContent="end"
      alignItems="center"
      gap={2}
    >
      {/* Previous button */}
      <Button
        size="small"
        variant="outlined"
        startIcon={<HiChevronLeft size={18} />}
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        sx={{ textTransform: "none" }}
      >
        
      </Button>

      {/* Page number */}
      <Typography
        variant="body2"
        fontWeight="bold"
        sx={{
          px: 2,
          py: 0.5,
          borderRadius: "6px",
          border: "1px solid #ddd",
          bgcolor: "#f9f9f9",
          minWidth: "36px",
          textAlign: "center",
        }}
      >
        {page}
      </Typography>

      {/* Next button */}
      <Button
        size="small"
        variant="outlined"
        endIcon={<HiChevronRight size={18} />}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        sx={{ textTransform: "none" }}
      >
        
      </Button>
    </Box>
      </Box>
    );
  }
  