import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Row, Typography, Col, Form, Select, InputNumber, Space, Divider, Button, message } from 'antd';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import PageContent from '../../_layout/pageContent/pageContent';
import './salidasForm.css';

const { Title } = Typography;
const { Item } = Form;

function SalidasForm(props) {
    const { id } = useParams();
    let navigate = useNavigate();
    const [form] = Form.useForm();

    let [loading, setLoading] = useState(true);
    let [pure, setPure] = useState([]);
    let [sucursales, setSucursales] = useState([]);
    let [productos, setProductos] = useState([]);

    useEffect(() => {
        if (id) {
            Promise.all([
                fetch(`https://localhost:44306/api/sucursales`, { method: 'GET' }).then(response => response.json()),
                fetch(`https://localhost:44306/api/salidas/${id}`, { method: 'GET' }).then(response => response.json())
            ])
                .then(responses => {
                    setPure(responses[0]);
                    setSucursales(responses[0].map(sucursal => { return { label: sucursal.nombre, value: sucursal.id } }));
                    setProductos(responses[0].filter(sucursal => sucursal.id === responses[1].id_Sucursal).map(sucursal => sucursal.catalogos)[0].map(catalogo => catalogo.producto).map(producto => { return { label: producto.nombre, value: producto.id } }));
                    form.setFieldsValue(responses[1]);
                    setLoading(false);
                });
        } else {
            fetch(`https://localhost:44306/api/sucursales`, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setPure(data);
                    setSucursales(data.map(sucursal => { return { label: sucursal.nombre, value: sucursal.id } }));
                    setLoading(false);
                });
        }
    }, []);

    const onFinish = (values) => {
        setLoading(true);

        let link, method;

        if (id) {
            link = `https://localhost:44306/api/salidas/${id}`;
            method = 'PUT';
            values.id = parseInt(id);
        } else {
            link = 'https://localhost:44306/api/salidas';
            method = 'POST';
        }

        values.tipo = 'Salida';
        const config = { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) }

        fetch(link, config)
            .then(response => {
                if (response.ok) {
                    message.success('Salida guardada');
                    navigate(-1);
                } else {
                    response.json().then(error => {
                        message.error(`${error.status}: ${error.title}`);
                        setLoading(false);
                    })
                }
            })
            .catch((error) => {
                message.error(error.message);
                setLoading(false);
            });
    };

    const onChange = (value) => {
        form.setFieldsValue({ id_Producto: undefined });
        setProductos(pure.filter(sucursal => sucursal.id === value).map(sucursal => sucursal.catalogos)[0].map(catalogo => catalogo.producto).map(producto => { return { label: producto.nombre, value: producto.id } }));
    }

    return (
        <PageContent title="Salidas" subtitle="Formulario">
            <Row>
                <Col span={8}>
                    <Title level={5} style={{ marginBottom: '24px' }}>{id ? 'Editar salida' : 'Agregar salida'}</Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Item label="Sucursal" name="id_Sucursal"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido',
                                },
                            ]}
                            hasFeedback>
                            <Select showSearch options={sucursales} allowClear onChange={onChange} />
                        </Item>

                        <Item label="Producto" name="id_Producto"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido',
                                },
                            ]}
                            hasFeedback>
                            <Select showSearch options={productos} allowClear />
                        </Item>

                        <Item label="Cantidad" name="cantidad"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido',
                                },
                            ]}
                            hasFeedback>
                            <InputNumber min={1} step={1} style={{ width: '100%' }} />
                        </Item>

                        <Item>
                            <Space split={<Divider type="vertical" />}>
                                <Button type="primary" icon={<CloseCircleOutlined />} danger ghost onClick={() => navigate(-1)}>
                                    Cancelar
                                </Button>
                                <React.StrictMode>
                                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                                        Guardar
                                    </Button>
                                </React.StrictMode>
                            </Space>
                        </Item>
                    </Form>
                </Col>
            </Row>
        </PageContent>
    )
}

export default SalidasForm;