import { Typography } from "@mui/material";
import { Inter } from "next/font/google";
import { ShopLayout } from "@/layouts/Layout";
import { ProductList } from "@/ui/ProductList";
import { initialData } from "../../database/products";
// import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ShopLayout title={"ShoppingCard"} pageDescription={"Products"}>
        <Typography variant="h1" component="h1">
          Home Shopping
        </Typography>
        <ProductList products={initialData.products} />
      </ShopLayout>
    </>
  );
}
