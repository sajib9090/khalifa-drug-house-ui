/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AuthenticatedRoute from "./AuthenticatedRoute";
import FullPageLoader from "../components/Loading/FullPageLoader";
import Error from "../pages/Error/Error";
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
const SingleInvoicePurchase = lazy(() =>
  import("../pages/Purchase/SingleInvoicePurchase")
);
const SingleMedicine = lazy(() =>
  import("../pages/Dashboard/MedicineDetails/SingleMedicine/SingleMedicine")
);
const Reports = lazy(() => import("../pages/Reports/Reports"));
const DateWiseReport = lazy(() =>
  import("../pages/Reports/DateWiseReport/DateWiseReport")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <Main />
      </AuthenticatedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "dashboard/medicine-details",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <MedicineDetails />
          </Suspense>
        ),
      },
      {
        path: "dashboard/medicine-details/:id",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <SingleMedicine />
          </Suspense>
        ),
      },
      {
        path: "dashboard/dosage-forms",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <DosageForms />
          </Suspense>
        ),
      },
      {
        path: "dashboard/groups",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Groups />
          </Suspense>
        ),
      },
      {
        path: "dashboard/companies",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Companies />
          </Suspense>
        ),
      },
      {
        path: "/purchase",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Purchase />
          </Suspense>
        ),
      },
      {
        path: "/purchase/:id",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <SingleInvoicePurchase />
          </Suspense>
        ),
      },
      {
        path: "/purchase/purchase-details?",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Query />
          </Suspense>
        ),
      },
      {
        path: "/purchase/purchase-details/new-purchase",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <NewPurchase />
          </Suspense>
        ),
      },
      {
        path: "/sell",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Sell />
          </Suspense>
        ),
      },
      {
        path: "/sell/:id",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <SingleInvoice />
          </Suspense>
        ),
      },
      {
        path: "/reports",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Reports />
          </Suspense>
        ),
      },
      {
        path: "/reports/query",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <DateWiseReport />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
]);
