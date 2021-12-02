import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Row, Typography, Col, Form, Input, Select, Switch, DatePicker, Space, Divider, Button, message } from 'antd';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import PageContent from '../../_layout/pageContent/pageContent';
import './productosForm.css';
import moment from 'moment';

const { Title } = Typography;
const { Item } = Form;
const { TextArea } = Input;

function ProductosForm(props) {
    const { id } = useParams();
    let navigate = useNavigate();
    const [form] = Form.useForm();

    let [loading, setLoading] = useState(true);
    let [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        if (id) {
            Promise.all([
                fetch(`https://localhost:44306/api/proveedores`, { method: 'GET' }).then(response => response.json()),
                fetch(`https://localhost:44306/api/productos/${id}`, { method: 'GET' }).then(response => response.json())
            ])
                .then(responses => {
                    setProveedores(responses[0].map(proveedor => { return { label: proveedor.nombre, value: proveedor.id } }));
                    responses[1].estado = responses[1].estado === 'Activo' ? true : false;
                    responses[1].fechaVencimiento = moment(responses[1].fechaVencimiento);
                    form.setFieldsValue(responses[1]);
                    setLoading(false);
                });
        } else {
            fetch(`https://localhost:44306/api/proveedores`, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setProveedores(data.map(proveedor => { return { label: proveedor.nombre, value: proveedor.id } }));
                    setLoading(false);
                });
        }
    }, []);

    const onFinish = (values) => {
        setLoading(true);

        let link, method;

        if (id) {
            link = `https://localhost:44306/api/productos/${id}`;
            method = 'PUT';
            values.id = parseInt(id);
        } else {
            link = 'https://localhost:44306/api/productos';
            method = 'POST';
        }

        values.estado = values.estado ? 'Activo' : 'Inactivo';
        const config = { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) }

        fetch(link, config)
            .then(response => {
                if (response.ok) {
                    message.success('Producto guardada');
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

    return (
        <PageContent title="Productos" subtitle="Formulario">
            <Row>
                <Col span={8}>
                    <Title level={5} style={{ marginBottom: '24px' }}>{id ? 'Editar producto' : 'Agregar producto'}</Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={{
                            estado: true
                        }}
                    >
                        <Item label="SKU" name="sku"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido',
                                },
                            ]}
                            hasFeedback>
                            <Input disabled={loading} allowClear />
                        </Item>

                        <Item label="Código de barra del proveedor" name="codigoBarra">
                            <Input disabled={loading} allowClear />
                        </Item>

                        <Item label="Nombre" name="nombre"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido',
                                },
                            ]}
                            hasFeedback>
                            <Input disabled={loading} allowClear />
                        </Item>

                        <Item label="Proveedor" name="id_Proveedor">
                            <Select showSearch options={proveedores} allowClear />
                        </Item>

                        <Item label="Fecha de vencimiento" name="fechaVencimiento">
                            <DatePicker style={{width: '100%'}} />
                        </Item>

                        <Item label="Comentario" name="comentario">
                            <TextArea showCount maxLength={1000} />
                        </Item>

                        <Item label="Estado" name="estado" valuePropName="checked">
                            <Switch checkedChildren="Activo" unCheckedChildren="Inactivo" disabled={loading} />
                        </Item>

                        <Divider />

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

export default ProductosForm;