import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmProvider } from "material-ui-confirm";

import { LicenseInfo } from "@mui/x-data-grid-pro";

LicenseInfo.setLicenseKey(
  "x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e"
);
function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ConfirmProvider>
        <RouterProvider router={router} />
      </ConfirmProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
