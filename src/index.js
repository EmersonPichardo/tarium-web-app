import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Login from './components/_layout/login/login';
import Layout from './components/_layout/_layout';
import Home from './components/_home/home';
import SucursalesList from './components/sucursal/list/sucursalesList';
import SucursalesDetails from './components/sucursal/details/sucursalesDetails';
import SucursalesForm from './components/sucursal/form/sucursalesForm';
import ProveedoresList from './components/proveedor/list/proveedoresList';
import ProveedoresDetails from './components/proveedor/details/proveedoresDetails';
import ProveedoresForm from './components/proveedor/form/proveedoresForm';
import 'antd/dist/antd.css';
import './components/_layout/_layout.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sucursales" element={<SucursalesList />} />
          <Route path="/sucursalesDetails/:id" element={<SucursalesDetails />} />
          <Route path="/sucursalesForm" element={<SucursalesForm />} />
          <Route path="/sucursalesForm/:id" element={<SucursalesForm />} />
          <Route path="/proveedores" element={<ProveedoresList />} />
          <Route path="/proveedoresDetails/:id" element={<ProveedoresDetails />} />
          <Route path="/proveedoresForm" element={<ProveedoresForm />} />
          <Route path="/proveedoresForm/:id" element={<ProveedoresForm />} />
          <Route path="*" element={<Result
            style={{ overflowY: 'auto' }}
            status="404"
            title="404"
            subTitle="Lo sentimos, esta página no existe"
            extra={<Button type="primary" icon={<HomeOutlined />} onClick={() => window.location.replace("/")}>Volver al inicio</Button>}
          />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);