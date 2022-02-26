import React, { useState } from 'react';
import '../../SCSS/Layout/layout.scss';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;

function UserPayment(props) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsedStatus) => {
    setCollapsed(collapsedStatus);
  };
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  /**
   * 設定選擇年份
   * @param e
   */
  const handleYearClick = (e) => {
    setSelectedYear(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">
            {
              collapsed
                ? null
                : <><UserOutlined /> 後臺管理系統 </>
            }
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
             <SubMenu key="sub1" icon={<FileTextOutlined />} title="訂單明細" onClick={handleYearClick}>
              <Menu.Item key={currentYear}>{ `${currentYear} 年`}</Menu.Item>
              <Menu.Item key={currentYear - 1}>{ `${currentYear - 1} 年`}</Menu.Item>
              <Menu.Item key={currentYear - 2}>{ `${currentYear - 2} 年`}</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>訂單明細</Breadcrumb.Item>
              <Breadcrumb.Item>{selectedYear}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Table
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>XXXX ©2022 Created by tom_chen</Footer>
        </Layout>
    </Layout>
  );
}

export default UserPayment;
