import { Grid } from "@mui/material";
import React, { FC } from "react";
import { ProductCard } from "./ProductCard";
import { IProduct } from "../../interfaces/products";

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};
