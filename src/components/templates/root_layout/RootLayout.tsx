import { Box } from "@mui/material";
import { Playground } from "components/molecules/side_bar";
import React, { useCallback } from "react";
// import { SideMenu } from "../../pages/menu/SideMenu";
import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
  const auth = true;
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);

  const handleToggled = useCallback(() => {
    setToggled(!toggled);
  }, [toggled]);

  if (auth) {
    return (
      <Box
        component="div"
        className={"main-app"}
        sx={{
          flexDirection: "row",
          display: "flex",
          flex: 1,
          height: "100vh",
        }}
      >
        <Playground
          collapsed={collapsed}
          setToggled={handleToggled}
          toggled={toggled}
        ></Playground>
        <Box
          id={"main-view"}
          sx={{ height: "100%", flex: 1, overflow: "auto" }}
        >
          <Outlet />
        </Box>
      </Box>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default RootLayout;
