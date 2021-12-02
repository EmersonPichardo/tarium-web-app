import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Space, Button, Tag, Popconfirm, message, Row, Col, Input, Table } from 'antd';
import { ZoomInOutlined, PlusCircleFilled, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import PageContent from '../../_layout/pageContent/pageContent';
import './salidasList.css';

let searchTimeout;

function SalidasList() {
    const columns = [{
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => {
            return (
                <Link to={`/salidasDetails/${record.id}`}>
                    <ZoomInOutlined style={{padding: '0px 6px'}}/>
                    {text}
                </Link>
            )
        }
    }, {
        title: 'Sucursal',
        dataIndex: 'sucursal',
        key: 'sucursal',
        render: (_, record) => record.sucursal.nombre
    }, {
        title: 'Producto',
        dataIndex: 'producto',
        key: 'producto',
        render: (_, record) => record.producto.nombre
    }, {
        title: 'Cantidad',
        dataIndex: 'cantidad',
        key: 'cantidad'
    }, {
        title: 'Acciones',
        key: 'acciones',
        width: '0px',
        render: (_, record) => (
            <Space size="large">
                <Link to={`/salidasForm/${record.id}`}>
                    <Button type="primary" size="small" icon={<EditOutlined />} ghost>
                        Editar
                    </Button>
                </Link>

                <Popconfirm
                    title="¿Desea eliminar esta salida?"
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
        fetch('https://localhost:44306/api/salidas', { method: 'GET' })
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

        fetch(`https://localhost:44306/api/salidas/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.status === 204) {
                    setData(data => data.filter(_data => _data.id !== id));
                    setFilteredData(filteredData => filteredData.filter(_data => _data.id !== id));
                    message.warning('Salida eliminada');
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
                    _data.id.toLowerCase().includes(text.toLowerCase()) ||
                    _data.sucursal.nombre.toLowerCase().includes(text.toLowerCase()) ||
                    _data.producto.nombre.toLowerCase().includes(text.toLowerCase()) ||
                    _data.cantidad.toString().toLowerCase().includes(text.toLowerCase())
                );
            }));
        }, 300);
    }

    return (
        <PageContent title="Salidas" subtitle="Listado">
            <Row justify="space-between" align="middle" style={{marginBottom: '24px'}}>
                <Col span={10}>
                    <Link key="1" to="/salidasForm">
                        <Button type="primary" size="large" icon={<PlusCircleFilled />}>
                            Agregar salida
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

export default SalidasList;