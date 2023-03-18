import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteProductAsync, getProductAsync } from "../../redux/productSlice";
import ProductFormDialog from "../../components/ProductFormDialog";
export default function ProductManagement() {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenConfirmDialog = (product) => {
    setOpenConfirmDialog(true);
    setSelectedProduct(product);
  };
  const deleteProduct = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteProductAsync(selectedProduct)).then(() => {
      dispatch(getProductAsync());
    });
  };
  return (
    <Box sx={{ width: "80%", m: "auto", pt: "50px" }}>
      <div style={{ textAlign: "end", paddingBottom: "30px" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenFormDialog(true)}
        >
          Add Product
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" width={50}>
                  <img
                    src={row.imgUrl}
                    alt={row.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">
                  <IconButton aria-label="delete" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => {
                      handleOpenConfirmDialog(row);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteProduct()}>Yes</Button>
          <Button onClick={() => setOpenConfirmDialog(false)} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ProductFormDialog
        open={openFormDialog}
        setOpen={() => setOpenFormDialog()}
      />
    </Box>
  );
}
