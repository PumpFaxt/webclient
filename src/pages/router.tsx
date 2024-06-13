import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../layout";

import HomePage from "./HomePage/HomePage";
import ErrorPage from "./ErrorPage/ErrorPage";
import ShowcasePage from "./ShowcasePage";
import DashboardPage from "./DashboardPage";
import ProtectedRoute, { ProtectedTypes } from "../common/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage />} />
        <Route path="showcase" element={<ShowcasePage />} />

        <Route element={<ProtectedRoute type={ProtectedTypes.CONNECTEDONLY} />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="/T/:id" element={<DashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
