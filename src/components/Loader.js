import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="20px"
    >
      <CircularProgress style={{ color: "black" }} />
    </Box>
  );
};

export default Loader;
