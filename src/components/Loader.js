import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = ({size = 80 ,color = "black"}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="20px"
    >
      <CircularProgress style={{ color: color}} />
    </Box>
  );
};

export default Loader;
