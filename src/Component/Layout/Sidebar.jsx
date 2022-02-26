import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

export default function Sidebar() {
  return (
    <>
      <Layout.Sider className="sidebar" width={220}>
        <Menu theme="dark">
          <Menu.Item key="1" icon={<span className="sidebar-icon" />}>
            <Link to="/payment">
              後臺管理系統
            </Link>
          </Menu.Item>
        </Menu>
        <div className="copy-right">tom_chen &copy; 2022</div>
      </Layout.Sider>
    </>
  );
}
