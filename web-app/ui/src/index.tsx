import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import LandingPage from './pages/Landing';
import TopologyPage from './pages/Topology';
import LoginPage from './pages/Login';
import UserPage from './pages/User';
import NetworkPage from './pages/NetworkPage';
import VirtualMachinePage from './pages/VirtualMachinePage';

import './index.css';

const router = createBrowserRouter([
  {
      path: "/",
      element: <LandingPage/>,
      children: [{
          path: "/login",
          element: <LoginPage/>,
      }],
  }, {
      path: "/user",
      element: <UserPage/>,
      children: [{
          path: "/user/:id/topologies",
          element: <TopologyPage/>,
      }, {
          path: "/user/:id/networks",
          element: <NetworkPage/>,
      }, {
          path: "/user/:id/vms",
          element: <VirtualMachinePage/>,
      }],
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
