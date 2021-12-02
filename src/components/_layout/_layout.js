import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Typography, Row, Col, Space, Divider, Badge, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
  PoweroffOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TagsOutlined,
  TeamOutlined,
  OrderedListOutlined,
  PullRequestOutlined,
  DownloadOutlined,
  UploadOutlined
} from '@ant-design/icons';
import './_layout.css';

const { Header, Sider } = Layout;
const { Text } = Typography;

function _Layout(props) {
  let [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate();

  function toggle() {
    setCollapsed(!collapsed);
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Space size="large">
          <Text type="danger"><PoweroffOutlined /></Text>
          <a href="/login">
            <Text type="danger">Cerrar sesión</Text>
          </a>
        </Space>
      </Menu.Item>
    </Menu>
  );

  const adminMenu = (
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
  );

  const transactionalMenu = (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<PullRequestOutlined />}>
            <Link to="/movimientos">Movimientos</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DownloadOutlined />}>
            <Link to="/entradas">Entradas</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/salidas">Salidas</Link>
          </Menu.Item>
        </Menu>
  );

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        {JSON.parse(localStorage.getItem('usuario'))?.rol === 1 ? adminMenu : transactionalMenu}
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
                <Dropdown overlay={menu}>
                  <span className="header-icon"><UserOutlined />
                    <span style={{padding: '0px 24px 0px 6px'}}>{JSON.parse(localStorage.getItem('usuario'))?.nombre || 'Desconocido'}</span>
                  </span>
                </Dropdown>
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