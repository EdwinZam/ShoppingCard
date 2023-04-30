import { useState } from "react";
import NextLink from "next/link";
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
// import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../../context";
// import { UiContext } from "../../context";

export const Navbar = () => {
  //   const { asPath, push } = useRouter();
  //   // console.log(asPath)
  //   const { toogleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" align="center">
            <Typography variant="h6">Home</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn"
        ></Box>

        <Box flex={1} />
        {/* Pantalla Grande */}

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantalla pequeña  */}
        <IconButton sx={{ display: { xs: "flex", sm: "none" } }}>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button color={"info"}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
