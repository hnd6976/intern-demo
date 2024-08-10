import React, { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes";
import appRoutes from "./config/appRoutes";

type LayoutType = React.ComponentType<any> | React.ReactNode;

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={appRoutes.search} replace={true} />}
      />

      {/* Public Routes */}
      {publicRoutes.map((route, index) => {
        const Page: any = route.component;
        let Layout: any = Fragment;
        if (route.layout) {
          Layout = route.layout;
        } else {
          Layout = Fragment;
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}

      {/* Private Routes */}
      {privateRoutes.map((route, index) => {
        const Page: any = route.component;
        let Layout: any = Fragment;
        if (route.layout) {
          Layout = route.layout;
        } else {
          Layout = Fragment;
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}

      {/* Catch All */}
      <Route
        path="/*"
        element={<Navigate to={`${appRoutes.notFound}`} replace={true} />}
      />
    </Routes>
  );
};
export default AppRouter;
