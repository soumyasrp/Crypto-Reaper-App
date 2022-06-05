import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const styles = {
    hoverStyle: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,

      width: "22%",
      margin: 5,
      "&:hover": { backgroundColor: "gold", color: "black" },
    },
  };
  return (
    <span
      className="click"
      onClick={onClick}
      style={
        styles.hoverStyle
        // border: "1px solid gold",
        // borderRadius: 5,
        // padding: 10,
        // paddingLeft: 20,
        // paddingRight: 20,
        // fontFamily: "Montserrat",
        // cursor: "pointer",
        // backgroundColor: selected ? "gold" : "",
        // color: selected ? "black" : "",
        // fontWeight: selected ? 700 : 500,

        // width: "22%",
        // margin: 5,
        // "&:hover": {
        //   backgroundColor: "gold",
        //    color: "black",
        // },
      }
    >
      {children}
    </span>
  );
};

export default SelectButton;
