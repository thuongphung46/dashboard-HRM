import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmProvider } from "material-ui-confirm";


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
