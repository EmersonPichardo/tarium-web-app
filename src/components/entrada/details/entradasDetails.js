import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Tag, Space, Divider, Button, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import PageContent from '../../_layout/pageContent/pageContent';
import './entradasDetails.css';

const { Item } = Descriptions;

function EntradasForm(props) {
    const { id } = useParams();
    let navigate = useNavigate();
    let [loading, setLoading] = useState(true);
    let [data, setData] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`https://localhost:44306/api/entradas/${id}`, { method: 'GET' })
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
        <PageContent title="Entradas" subtitle="Detalles">
            <Descriptions title={`Transacción #${id}`} column={1} bordered>
                <Item label="Id">{data.id}</Item>
                <Item label="Tipo">{data.tipo}</Item>
                <Item label="Sucursal">{data?.sucursal?.nombre}</Item>
                <Item label="Producto">{data?.producto?.nombre}</Item>
                <Item label="Cantidad">{data.cantidad}</Item>
                <Item label="Costo">{'$' + parseFloat(data.costo).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Item>
            </Descriptions>

            <Divider />

            <Space split={<Divider type="vertical" />}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
                    Volver
                </Button>
                <Button type="primary" icon={<EditOutlined />} onClick={() => navigate(`/entradasForm/${id}`)}>
                    Editar
                </Button>
            </Space>
        </PageContent>
    )
}

export default EntradasForm;