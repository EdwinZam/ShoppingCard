import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Link,
  Button,
  Typography,
} from "@mui/material";
import React, { FC, useContext, useMemo, useState } from "react";
import NextLink from "next/link";
import { IProduct } from "../../interfaces/products";
import { ItemCounter } from "./ItemCounter";
import { ICartProduct } from "../../interfaces/cart";
import { CartContext } from "../../context";
import { useRouter } from "next/router";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const router = useRouter();

  const { addProductToCart } = useContext(CartContext);

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProduct = () => {
    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <CardActionArea>
          {product.inStock === 0 && (
            <Chip
              color="primary"
              label="No hay disponibles"
              sx={{
                position: "absolute",
                zIndex: 99,
                top: "10px",
                left: "10px",
              }}
            />
          )}
          <CardMedia
            sx={{
              cursor: "default",
            }}
            component="img"
            className="fadeIn"
            image={productImage}
            alt={product.title}
          />
        </CardActionArea>
      </Card>

      <Box sx={{ mt: 1, display: "block" }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$ ${product.price}`}</Typography>
        {product.inStock > 0 && (
          <>
            <ItemCounter
              currentValue={tempCartProduct.quantity}
              updatedQuantity={onUpdateQuantity}
              maxValue={product.inStock > 10 ? 10 : product.inStock}
            />
            <Button
              color="secondary"
              className="circular-btn"
              onClick={onAddProduct}
            >
              Agregar al carrito
            </Button>
          </>
        )}
      </Box>
    </Grid>
  );
};
