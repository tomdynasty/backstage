import React, { useState } from 'react';
import '../../SCSS/Layout/layout.scss';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import OrderTable from './OrderTable';
import OrderPie from './OrderPie';
import OrderStatistic from './OrderStatistic';
import OrderMonthlyBar from './OrderMonthlyBar';
import '../../SCSS/Component/orderTable.scss';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;

function Order(props) {
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
    setSelectedYear(parseInt(e.key, 10));
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
             {/* 目前點擊 subMenu 會有紅字提醒 `findDOMNode is deprecated in StrictMode`，這部分待 antd 解決，不影響功能
             https://github.com/ant-design/ant-design/issues/26136 */}
             <SubMenu key="sub1" icon={<FileTextOutlined />} title="訂單明細" onClick={handleYearClick}>
              <Menu.Item key={currentYear}>{ `${currentYear} 年`}</Menu.Item>
              <Menu.Item key={currentYear - 1}>{ `${currentYear - 1} 年`}</Menu.Item>
              <Menu.Item key={currentYear - 2}>{ `${currentYear - 2} 年`}</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Breadcrumb style={{ margin: '16px 20px' }}>
            <Breadcrumb.Item>訂單明細</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedYear}</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ margin: '0 16px', marginBottom: '16px', display: 'inline-flex' }}>
              <div className="site-layout-background"
                  style={{ padding: 24, minHeight: 360, width: '50vw' }}>
                <OrderPie year={selectedYear} />
              </div>
              <div
              style={{
                width: '50vw',
                marginLeft: '15px',
              }}>
                <div className="site-layout-background" style={{ padding: 24 }}>
                  <OrderStatistic style={{ marginBottom: '15px' }}/>
                </div>
                <div className="site-layout-background"
                  style={{
                    padding: 24,
                  }}>
                 <OrderMonthlyBar />
                </div>
              </div>
          </Content>
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <OrderTable year={selectedYear} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>XXXX ©2022 Created by tom_chen</Footer>
        </Layout>
    </Layout>
  );
}

export default Order;
