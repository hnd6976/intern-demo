import { ReactNode } from "react";
import { Link } from "react-router-dom";

import appRoutes from "@config/appRoutes";

interface IMainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: IMainLayoutProps) {
  return (
    <div className="flex flex-col justify-between w-screen h-screen overflow-y-scroll bg-center bg-repeat bg-cover bg-image-1">
      <header className="p-6">
        <Link
          to={`${appRoutes.home}`}
          className="text-2xl font-semibold text-white"
        >
          Main Layout
        </Link>
      </header>
      <section>{children}</section>
      <footer></footer>
    </div>
  );
}

export default MainLayout;
