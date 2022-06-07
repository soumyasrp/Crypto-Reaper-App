// import { useTheme } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinInfo } from "../Components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { styled } from "@mui/material/styles";
import { LinearProgress, Typography } from "@mui/material";
// import parse from "html-react-parser";
import { numberWithCommas } from "../Components/CoinsTable";
import { Button } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  // console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);
  const parse = require("html-react-parser");

  const Responsive = styled("div")(({ theme }) => ({
    paddingTop: "66px",

    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const SideBar = styled("div")(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  }));

  const MarketData = styled("div")(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",

    // Make it Responsive

    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  const inWatchlist = watchlist.includes(coin?.id);
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },

        { merge: "true" }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  const htmlFromCMS = coin?.description.en.split(". ")[0];
  return (
    <Responsive>
      <SideBar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: htmlFromCMS }}></div>
        </Typography>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
              }}
            >
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                color: "black",
              }}
              variant="outlined"
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </MarketData>
      </SideBar>
      {/* chart */}
      <CoinInfo coin={coin} />
    </Responsive>
  );
};

export default Coinpage;
