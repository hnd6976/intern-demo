import { ReactNode, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  SearchOutlined,
  SettingOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import appRoutes from "@config/appRoutes";
const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <NavLink to="/login" className="nav__logo">
        Home
      </NavLink>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <NavLink to="/search" className="nav__logo">
        Search
      </NavLink>
    ),
    key: "/search",
    icon: <SearchOutlined />,
  },
  {
    label: (
      <NavLink to="/login" className="nav__logo">
        Account
      </NavLink>
    ),
    key: "/login",
    icon: <UserOutlined />,
  },
  {
    label: "Setting",
    key: "setting",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          { label: "Option 1", key: "setting:1" },
          { label: "Option 2", key: "setting:2" },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
        ],
      },
    ],
  },
];
interface IDefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: IDefaultLayoutProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [current, setCurrent] = useState("search");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="flex flex-col justify-between w-screen h-screen overflow-y-scroll bg-center bg-repeat bg-cover bg-image-1">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div className="demo-logo" />
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </Header>

      <div>{children}</div>

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </div>
  );
}

export default DefaultLayout;
