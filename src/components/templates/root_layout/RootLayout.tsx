import { Box } from "@mui/material";
import { PrimarySearchAppBar } from "components/molecules/navbar";
import { Playground } from "components/molecules/side_bar";
import React, { useCallback, useEffect } from "react";
// import { SideMenu } from "../../pages/menu/SideMenu";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
type Theme = "light" | "dark";
const RootLayout = () => {
  // const auth = true;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>("light");
  const currentUser = Boolean(localStorage.getItem("access_token"));

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  const handleToggled = useCallback(() => {
    setToggled(!toggled);
  }, [toggled]);
  const handleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const handleBroken = useCallback((e: boolean) => {
    setBroken(e);
  }, []);

  const handleTheme = useCallback((e: Theme) => {
    setTheme(e);
  }, []);

  if (currentUser) {
    return (
      <Box
        component="div"
        className={"main-app"}
        sx={{
          flexDirection: "row",
          display: "flex",
          flex: 1,
          height: "100vh",
          width: "100%",
        }}
      >
        <Playground
          collapsed={collapsed}
          setToggled={handleToggled}
          toggled={toggled}
          onBreakPoint={handleBroken}
          setTheme={handleTheme}
          theme={theme}
        />
        <Box
          id={"side-bar"}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flex: 1,
          }}
        >
          <PrimarySearchAppBar
            setCollapsed={handleCollapsed}
            collapsed={collapsed}
            setToggled={handleToggled}
            toggled={toggled}
            broken={broken}
          />
          <Box
            id={"main-view"}
            sx={{ height: "100%", overflow: "auto", padding: 1 }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default RootLayout;
