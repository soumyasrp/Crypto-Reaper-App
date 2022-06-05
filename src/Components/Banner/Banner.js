import React from "react";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div style={{ backgroundImage: "url(./backgr.jpg)" }}>
      <Container
        style={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 25,
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Reaper
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get All The Info Regarding Your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
