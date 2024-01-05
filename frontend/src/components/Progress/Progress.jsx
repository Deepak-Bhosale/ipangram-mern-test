import React from "react";
import { CircularProgress } from "@mui/material";

const Progress = () => (
  <center>
    <CircularProgress sx={{ animationDuration: "revert" }} />
  </center>
);

export default Progress;
