import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/argon-dashboard-react.css";
import "react-toastify/dist/ReactToastify.css";

import UserLayout from "layouts/User";
import AuthLayout from "layouts/Auth";

import Login from "views/Login";
import Register from "views/Register";
import Profile from "views/Profile";
import {
  Dashboard,
  loader as dashboardLoader
} from "views/Dashboard";
import {
  Topologies,
  loader as topologiesLoader,
} from "views/Topologies";
import {
  Topology,
  loader as topologyLoader,
} from "views/Topology";
import { TopologyCreate, createTopologyAction } from "views/CreateTopology";
import {
  Networks,
  loader as networksLoader,
} from "views/Networks";
import {
  Network,
  loader as networkLoader,
} from "views/Network";
import { NetworkCreate, createNetworkAction} from "views/CreateNetwork";
import {
  VirtualMachines,
  loader as vmsLoader,
} from "views/VirtualMachines";
import {
  VirtualMachine,
  loader as vmLoader,
} from "views/VirtualMachine";
import { CreateVirtualMachine } from "views/CreateVirtualMachine";

import {AuthProvider} from "contexts/AuthProvider";
import { AuthWrapper } from "wrapper/AuthWrapper";

const Root = () => {
  return (
    <>
      <ToastContainer
        hideProgressBar={true}
        autoClose={3000}
        pauseOnHover={false}
        newestOnTop={true}
        theme="colored"
      />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Root />}>
        {/* ==== AUTH ROUTES ==== */}
        <Route element={<AuthLayout />} >
          <Route
            path="auth/login"
            element={<Login />} />
          <Route
            path="auth/register"
            element={<Register />} />
        </Route>
        {/* ==== PROTECTED ROUTES ==== */}
        <Route element={<AuthWrapper />} >
          <Route element={<UserLayout />} >
            <Route
              path="/"
              element={<Navigate to={"/dashboard"} replace />} />
            <Route
              path="dashboard"
              element={<Dashboard />}
              loader={dashboardLoader} />
            <Route
              path="profile"
              element={<Profile />} />
            <Route
              path="topologies"
              element={<Topologies />}
              loader={topologiesLoader} />
            <Route
              path="topologies/:topologyId"
              element={<Topology />}
              loader={topologyLoader}
              errorElement={<Navigate to="/topologies" replace />} />
            <Route
              path="topologies/create"
              element={<TopologyCreate />}
              action={createTopologyAction} />
            <Route
              path="networks"
              element={<Networks />}
              loader={networksLoader} />
            <Route
              path="networks/create"
              element={<NetworkCreate />}
              action={createNetworkAction} />
            <Route
              path="networks/:networkId"
              element={<Network />}
              loader={networkLoader}
              errorElement={<Navigate to="/networks" replace />} />
            <Route
              path="virtual-machines"
              element={<VirtualMachines />}
              loader={vmsLoader} />
            <Route
              path="virtual-machines/create"
              element={<CreateVirtualMachine />} />
            <Route
              path="virtual-machines/:vmId"
              element={<VirtualMachine />}
              loader={vmLoader} />
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
