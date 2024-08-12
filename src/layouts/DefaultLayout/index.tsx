import React, { ReactNode, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Flex, Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/JWTAuthContext";
import Typography from "antd/es/typography/Typography";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <NavLink to="/home" className="nav__logo">
        Home
      </NavLink>
    ),
    key: "/home",
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
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  });
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <Flex
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar size={50} src={user?.avatar} />
          <Typography style={{ marginLeft: 10, color: "white" }}>
            {user?.userName}
          </Typography>
        </Flex>

        <Menu
          theme="dark"
          mode="inline"
          onClick={onClick}
          selectedKeys={[current]}
          items={items}
        />
      </Sider>
      <Layout style={{ marginInlineStart: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
