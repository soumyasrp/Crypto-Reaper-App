import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoState } from "../CryptoContext";
import { AuthModal } from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency, user } = CryptoState();
  //   console.log(currency);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" postion="static">
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            style={{
              flex: 1,
              color: "gold",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            variant="h6"
          >
            Crypto Reaper
          </Typography>
          <Select
            variant="outlined"
            style={{ width: 100, height: 40, marginRight: 15 }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
          {user ? <UserSidebar /> : <AuthModal />}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
