// import { fontSize } from "@mui/system";
import React from "react";
import Banner from "../Components/Banner/Banner";
import CoinsTable from "../Components/CoinsTable";

const Homepage = () => {
  return (
    <div style={{ paddingTop: "66px" }}>
      <Banner />
      <CoinsTable />
    </div>
  );
};

export default Homepage;
