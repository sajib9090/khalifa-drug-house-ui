/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AuthenticatedRoute from "./AuthenticatedRoute";
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const MedicineDetails = lazy(() =>
  import("../pages/Dashboard/MedicineDetails/MedicineDetails")
);
const DosageForms = lazy(() =>
  import("../pages/Dashboard/DosageForms/DosageForms")
);
const Purchase = lazy(() => import("../pages/Purchase/Purchase"));
const Groups = lazy(() => import("../pages/Dashboard/Groups/Groups"));
const Companies = lazy(() => import("../pages/Dashboard/Companies/Companies"));
const Query = lazy(() => import("../pages/Purchase/PurchaseDetails/Query"));
const NewPurchase = lazy(() =>
  import("../pages/Purchase/NewPurchase/NewPurchase")
);
const Sell = lazy(() => import("../pages/Sell/Sell"));
const SingleInvoice = lazy(() => import("../pages/Sell/SingleInvoice"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <Main />
      </AuthenticatedRoute>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "dashboard/medicine-details",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <MedicineDetails />
          </Suspense>
        ),
      },
      {
        path: "dashboard/dosage-forms",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <DosageForms />
          </Suspense>
        ),
      },
      {
        path: "dashboard/groups",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Groups />
          </Suspense>
        ),
      },
      {
        path: "dashboard/companies",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Companies />
          </Suspense>
        ),
      },
      {
        path: "/purchase",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Purchase />
          </Suspense>
        ),
      },
      {
        path: "/purchase/purchase-details?",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Query />
          </Suspense>
        ),
      },
      {
        path: "/purchase/purchase-details/new-purchase",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <NewPurchase />
          </Suspense>
        ),
      },
      {
        path: "/sell",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Sell />
          </Suspense>
        ),
      },
      {
        path: "/sell/:id",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <SingleInvoice />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <h1>Error</h1>,
  },
]);
