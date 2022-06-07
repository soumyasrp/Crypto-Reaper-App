// import React from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AppBar, Tab, Tabs } from "@mui/material";
import styled from "@emotion/styled";
import { Login } from "./Login";
import { Signup } from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SideBar = styled("div")(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.background.paper,
  color: "white",
  borderRadius: 10,
}));

export const AuthModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { setAlert } = CryptoState();
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `sign Up Successful.Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          width: 85,
          height: 40,

          backgroundColor: "#EEBC1D",
        }}
      >
        Login
      </Button>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}></Box> */}
        <SideBar>
          <AppBar
            position="static"
            style={{ backgroundColor: "transparent", color: "white" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              style={{ borderRadius: 10 }}
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose} />}
          {value === 1 && <Signup handleClose={handleClose} />}

          <Box
            style={{
              padding: 24,
              paddingTop: 0,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              gap: "center",
              gap: 20,
              fontSize: 20,
            }}
          >
            <span>OR</span>

            <GoogleButton
              style={{ width: "100%", outline: "none" }}
              onClick={signInWithGoogle}
            />
          </Box>
        </SideBar>
      </Modal>
    </div>
  );
};
