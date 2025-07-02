import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Button,
  DialogActions,
} from "@mui/material";
function ModalChoose({
  onCloseChoose,
  openCate,
  dataChoose,
  typeChoose,
  selectChoose,
  dataSelect,
  search,
  setSearch,
  error
}) {
  const isSelect = (id) => dataSelect.includes(id);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }
  const filterData = dataChoose.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <Dialog open={openCate} onClose={onCloseChoose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex gap-3 items-center justify-between">
        <h1 className="whitespace-nowrap">Choose {typeChoose} </h1>
        <TextField
          fullWidth
          onChange={handleSearch}
          placeholder="Enter keywords..."
          variant="outlined"
          value={search}
          name={search}
          size="small"
          sx={{ width: "50%" }}
        />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          {filterData.map((item, index) => (
            <Grid item key={index}>
              {typeChoose === "categories" ? (
                <Button
                  
                  onClick={() => selectChoose(item.id,typeChoose)}
                  sx={{
                    m: 0.5,
                    color: isSelect(item.id) ? "white" : "primary.main",
                  }}
                  variant={isSelect(item.id) ? "contained" : "outlined"}
                  size="small"
                >
                  {item.name}
                </Button>
              ) : (
                <div className="p-3" onClick={() => selectChoose(item.id,typeChoose)}>
                  <img
                    src={item.imgUrl}
                    className={`w-15 h-15 rounded-full m-auto object-cover ${
                      isSelect(item.id) ? "border-2 border-red-700" : ""
                    }`}
                  />
                  <p
                    className={`text-center ${
                      isSelect(item.id) ? "text-amber-600 font-bold" : ""
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseChoose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalChoose;
