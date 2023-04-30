import "@/styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { lightTheme } from "../../themes";
import { CartProvider } from "../../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CartProvider>
  );
}
