import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../../components/Navbar/Navbar";

const drawerWidth = 240;

const PrivateLayout = (props) => {
  const { children } = props;
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  if (authenticated) {
    return (
      <div>
        <Box sx={{ display: "flex" }}>
          <Navbar />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          ></Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </div>
    );
  }
  return <div />;
};

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateLayout;
