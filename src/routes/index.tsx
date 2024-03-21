import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "components/pages/error";
import { HomePage } from "components/pages/home";
import { GeneralPage } from "components/pages/general";
import { ManagementLevelModelPage } from "components/pages/management_level_model";
import RootLayout from "components/templates/root_layout/RootLayout";
import { DetailEmployeePage } from "components/pages/staff";
import { ImportPage } from "components/pages/import";
import { TeachingContractPage } from "components/pages/teaching_contract";
import { SignIn } from "components/pages/login";
import { TabDetailStaff } from "components/molecules/staff/tab_detail";

enum FORM_STATE {
  EDIT = "edit",
  ADD = "add",
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/model",
        element: <ManagementLevelModelPage form_state={FORM_STATE.EDIT} />,
      },
      {
        path: "/general",
        element: <GeneralPage />,
      },
      {
        path: "/detail_employee",
        element: <DetailEmployeePage />,
      },
      { path: "/detail_employee/:id", element: <TabDetailStaff /> },
      {
        path: "/teaching_contract",
        element: <TeachingContractPage />,
      },
      {
        path: "/import",
        element: <ImportPage />,
      },
    ],
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    children: [{ path: "/login", element: <SignIn /> }],
  },
]);

export { router };
