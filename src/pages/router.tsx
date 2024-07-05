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
import HuddleVoicePage from "./HuddleVoicePage";
import TokenPage from "./TokenPage";
import FaucetPage from "./FaucetPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage />} />
        <Route path="showcase" element={<ShowcasePage />} />
        <Route path="/T/:address" element={<TokenPage />} />
        <Route path="faucet" element={<FaucetPage />} />

        <Route element={<ProtectedRoute type={ProtectedTypes.USABLEONLY} />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
