import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Tag, Space, Divider, Button, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import PageContent from '../../_layout/pageContent/pageContent';
import './proveedoresDetails.css';

const { Item } = Descriptions;

function ProveedoresForm(props) {
    const { id } = useParams();
    let navigate = useNavigate();
    let [loading, setLoading] = useState(true);
    let [data, setData] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`https://localhost:44306/api/proveedores/${id}`, { method: 'GET' })
                .then(response => response.json())
                .then(_data => {
                    setData(_data);
                    setLoading(false);
                });
        } else {
            message.error('id no encontrado');
            setLoading(false);
        }
    }, []);

    return (
        <PageContent title="Proveedores" subtitle="Detalles">
            <Descriptions title={`Proveedor #${id}`} column={1} bordered>
                <Item label="Id">{data.id}</Item>
                <Item label="Nombre">{data.nombre}</Item>
                <Item label="Contacto">{data.contacto}</Item>
                <Item label="Comentario">{data.comentario}</Item>
                <Item label="Estado">{<Tag color={data.estado === 'Activo' ? 'success' : 'error'}>{data.estado}</Tag>}</Item>
            </Descriptions>

            <Divider />

            <Space split={<Divider type="vertical" />}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
                    Volver
                </Button>
                <Button type="primary" icon={<EditOutlined />} onClick={() => navigate(`/proveedoresForm/${id}`)}>
                    Editar
                </Button>
            </Space>
        </PageContent>
    )
}

export default ProveedoresForm;