import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import NextLink from "next/link";
import { ICartProduct } from "../../interfaces/cart";
import { CartContext } from "../../context";
import { ItemCounter } from "@/ui/ItemCounter";

export const CartList = () => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href={`/`} passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>M</strong>
              </Typography>
              <ItemCounter
                currentValue={product.quantity}
                maxValue={10}
                updatedQuantity={(value) => {
                  onNewCartQuantityValue(product as ICartProduct, value);
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$ ${product.price}`}</Typography>

            <Button
              variant="text"
              color="secondary"
              onClick={() => removeCartProduct(product as ICartProduct)}
            >
              Remover
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
