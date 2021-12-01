import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Row, Col, Space, Divider, Badge } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TagsOutlined,
  TeamOutlined,
  OrderedListOutlined
} from '@ant-design/icons';
import './_layout.css';

const { Header, Sider } = Layout;

function _Layout(props) {
  let [collapsed, setCollapsed] = useState(false);

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">inicio</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />}>
            <Link to="/sucursales">Sucursales</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingOutlined />}>
            <Link to="/proveedores">Proveedores</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TagsOutlined />}>
            <Link to="/productos">Productos</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<TeamOutlined />}>
            <Link to="/usuarios">Usuarios</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<OrderedListOutlined />}>
            <Link to="/inventario">Inventario</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <Row justify="space-between">
            <Col span={8}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'header-icon trigger',
                onClick: toggle,
              })}
            </Col>
            <Col span={8} style={{ textAlign: 'right', paddingRight: '16px' }}>
              <Space split={<Divider type="vertical" />}>
                <Badge dot>
                  <BellOutlined className="header-icon" />
                </Badge>
                <span className="header-icon"><UserOutlined /> Emerson Pichardo</span>
              </Space>
            </Col>
          </Row>
        </Header>
        {props.children}
      </Layout>
    </Layout>
  )
}

export default _Layout;