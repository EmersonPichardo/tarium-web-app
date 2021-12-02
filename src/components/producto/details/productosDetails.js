import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Tag, Space, Divider, Button, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import PageContent from '../../_layout/pageContent/pageContent';
import './productosDetails.css';
import moment from 'moment';

const { Item } = Descriptions;

function ProductosForm(props) {
    const { id } = useParams();
    let navigate = useNavigate();
    let [loading, setLoading] = useState(true);
    let [data, setData] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`https://localhost:44306/api/productos/${id}`, { method: 'GET' })
                .then(response => response.json())
                .then(_data => {
                    _data.fechaVencimiento = moment(_data.fechaVencimiento).format('DD MMM YYYY');
                    setData(_data);
                    setLoading(false);
                });
        } else {
            message.error('id no encontrado');
            setLoading(false);
        }
    }, []);

    return (
        <PageContent title="Productos" subtitle="Detalles">
            <Descriptions title={`Producto #${id}`} column={2} bordered>
                <Item label="Id">{data.id}</Item>
                <Item label="SKU">{data.sku}</Item>
                <Item label="Nombre" span={2}>{data.nombre}</Item>
                <Item label="Proveedor">{data.proveedor?.nombre || '-'}</Item>
                <Item label="Código de barra del proveedor">{data.codigoBarra || '-'}</Item>
                <Item label="Fecha de vencimiento" span={2}>{data.fechaVencimiento || '-'}</Item>
                <Item label="Comentario" span={2}>{data.comentario || '-'}</Item>
                <Item label="Estado" span={2}>{<Tag color={data.estado === 'Activo' ? 'success' : 'error'}>{data.estado}</Tag>}</Item>
            </Descriptions>

            <Divider />

            <Space split={<Divider type="vertical" />}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
                    Volver
                </Button>
                <Button type="primary" icon={<EditOutlined />} onClick={() => navigate(`/productosForm/${id}`)}>
                    Editar
                </Button>
            </Space>
        </PageContent>
    )
}

export default ProductosForm;