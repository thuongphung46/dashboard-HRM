import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "@component/templates/root_layout/RootLayout";
import { ErrorPage } from "components/pages/error";
import { HomePage } from "components/pages/home";
import { GeneralPage } from "components/pages/general";
import { ManagementLevelModelPage } from "components/pages/management_level_model";
import RootLayout from "components/templates/root_layout/RootLayout";
import { DetailEmployeePage } from "components/pages/staff";
import { ImportPage } from "components/pages/import";
import { TeachingContractPage } from "components/pages/teaching_contract";

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
        // children: [{ path: ":version", element: <UpgradeSystemPage /> }],
      },
      // {
      //   path: "upgrade/:version/jobs",
      //   element: <JobRunningPage />,
      //   children: [
      //     {
      //       path: ":database",
      //       element: <TaskMonitorContainer />,
      //     },
      //   ],
      // },
      // {
      //   path: "/versions",
      //   element: <VersionManagement />,
      //   children: [
      //     { path: "/versions", element: <VersionList />, index: true },
      // {
      //   path: "/versions/addnew",
      //   element: <VersionDetailPage form_state={FORM_STATE.ADD} />,
      // },
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
]);

export { router };
