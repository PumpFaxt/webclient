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
import StreamingTestPage from "./StreamingTestPage/StreamingTestPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage />} />
        <Route path="showcase" element={<ShowcasePage />} />

        <Route element={<ProtectedRoute type={ProtectedTypes.VERIFIEDONLY} />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="/T/:id" element={<DashboardPage />} />
        <Route path="/testingPage" element={<StreamingTestPage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
