import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Space, Button, Tag, Popconfirm, message, Row, Col, Input, Table } from 'antd';
import { ZoomInOutlined, PlusCircleFilled, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import PageContent from '../../_layout/pageContent/pageContent';
import './proveedoresList.css';

let searchTimeout;

function ProveedoresList() {
    const columns = [{
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        render: (text, record) => {
            return (
                <Link to={`/proveedoresDetails/${record.id}`}>
                    <ZoomInOutlined style={{padding: '0px 6px'}}/>
                    {text}
                </Link>
            )
        }
    }, {
        title: 'Contacto',
        dataIndex: 'contacto',
        key: 'contacto',
        render: text => text || '-'
    }, {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado',
        render: text => {
            let color = '';

            if (text.toLowerCase() === 'activo') color = 'success';
            if (text.toLowerCase() === 'inactivo') color = 'error';

            return (
                <Tag color={color}>{text}</Tag>
            )
        }
    }, {
        title: 'Acciones',
        key: 'acciones',
        width: '0px',
        render: (_, record) => (
            <Space size="large">
                <Link to={`/proveedoresForm/${record.id}`}>
                    <Button type="primary" size="small" icon={<EditOutlined />} ghost>
                        Editar
                    </Button>
                </Link>

                <Popconfirm
                    title="¿Desea eliminar este proveedor?"
                    onConfirm={() => eliminar(record.id)}
                    okText="Sí"
                    cancelText="No"
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                >
                    <Button type="dashed" size="small" icon={<DeleteOutlined />} danger>
                        Eliminar
                    </Button>
                </Popconfirm>
            </Space>
        ),
    }];

    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://localhost:44306/api/proveedores', { method: 'GET' })
            .then(response => response.json())
            .then(_data => {
                _data.map(d => { d.key = d.id; return d; })
                setData(_data);
                setFilteredData(_data);
                setLoading(false);
            });
    }, []);

    const eliminar = (id) => {
        setLoading(true);

        fetch(`https://localhost:44306/api/proveedores/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.status === 204) {
                    setData(data => data.filter(_data => _data.id !== id));
                    setFilteredData(filteredData => filteredData.filter(_data => _data.id !== id));
                    message.warning('Proveedor eliminada');
                } else {
                    message.error('Error al eliminar');
                }

                setLoading(false);
            });
    }

    const onSearch = (event) => {
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            const text = event.target.value;

            setFilteredData(data.filter(_data => {
                return (
                    _data.nombre.toLowerCase().includes(text.toLowerCase()) ||
                    _data.contacto.toLowerCase().includes(text.toLowerCase()) ||
                    _data.estado.toLowerCase().includes(text.toLowerCase())
                );
            }));
        }, 300);
    }

    return (
        <PageContent title="Proveedores" subtitle="Listado">
            <Row justify="space-between" align="middle" style={{marginBottom: '24px'}}>
                <Col span={10}>
                    <Link key="1" to="/proveedoresForm">
                        <Button type="primary" size="large" icon={<PlusCircleFilled />}>
                            Agregar proveedor
                        </Button>
                    </Link>
                </Col>
                <Col span={6}>
                    <Input
                        placeholder="Buscar..."
                        onChange={onSearch}
                        allowClear
                        suffix={<SearchOutlined style={{ fontSize: 16, color: '#1890ff' }} />}
                    />
                </Col>
            </Row>

            <Table columns={columns} dataSource={filteredData} loading={loading} />
        </PageContent>
    );
}

export default ProveedoresList;