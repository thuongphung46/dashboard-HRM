import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "components/pages/error";
import { HomePage } from "components/pages/home";
import { GeneralPage } from "components/pages/general";
import { ManagementLevelModelPage } from "components/pages/management_level_model";
import RootLayout from "components/templates/root_layout/RootLayout";
import { ListEmployeePage } from "components/pages/staff";
import { ImportPage } from "components/pages/import";
import { TeachingContractPage } from "components/pages/teaching_contract";
import { AddNewContract } from "components/molecules/staff/tab_teaching_contract/deatail_contract";
import { SignIn } from "components/pages/login";
import { TabDetailStaff } from "components/molecules/staff/tab_detail";
import { StatisticPage } from "components/pages/statistic";
import { FC } from "react";
import { Navigate } from "react-router-dom";

enum FORM_STATE {
  EDIT = "edit",
  ADD = "add",
}

interface PropType {
  component: any;
  action?: FORM_STATE;
}

const PrivateRoute: FC<PropType> = ({ component: Component, action }) => {
  const level = localStorage.getItem("level");

  if (level === "LEVEL_1") return <Component action={action} />;
  return <Navigate to="/model" />;
};
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
        element: <ListEmployeePage />,
      },
      {
        path: "/detail_employee/:id",
        element: <TabDetailStaff action={FORM_STATE.EDIT} />,
      },
      {
        path: "/detail_employee/add",
        element: <TabDetailStaff action={FORM_STATE.ADD} />,
      },
      {
        path: "/teaching_contract",
        element: <PrivateRoute component={TeachingContractPage} />,
      },
      {
        path: "/teaching_contract/add",
        element: (
          <PrivateRoute action={FORM_STATE.ADD} component={AddNewContract} />
        ),
      },
      {
        path: "/import",
        element: <ImportPage />,
      },
      {
        path: "/statistic",
        element: <StatisticPage />,
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
