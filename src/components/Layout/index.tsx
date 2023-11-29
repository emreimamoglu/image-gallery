import Header from "../Header";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
    </>
  );
};

export default Layout;