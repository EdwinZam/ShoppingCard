import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { CartContext } from "../../context";

export const OrderSummary = () => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {" "}
          {numberOfItems} {numberOfItems > 1 ? "productos" : "producto"}{" "}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubToTal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography> {subTotal} </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos 19%</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography> {tax} </Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total: </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 1 }}>
        <Typography variant="subtitle1">
          {" "}
          <strong> {total} </strong>
        </Typography>
      </Grid>
    </Grid>
  );
};
