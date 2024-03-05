import { createBrowserRouter } from "react-router-dom";
// import { ErrorPage } from "@component/pages/error";
// import { VersionManagement } from "@component/pages/version_management/VersionListPage";
// import { VersionList } from "@component/molecules/version_info/VersionList";
// import RootLayout from "@component/templates/root_layout/RootLayout";
import { ErrorPage } from "components/pages/error";
import { HomePage } from "components/pages/home";
import RootLayout from "components/templates/root_layout/RootLayout";

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
      // {
      //   path: "/versions/:version",
      //   element: <VersionDetailPage form_state={FORM_STATE.EDIT} />,
      // },
      //   ],
      // },
    ],
  },
]);

export { router };
