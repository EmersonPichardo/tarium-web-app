import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Row, Typography, Col, Form, Input, Radio, Switch, Space, Divider, Button, message } from 'antd';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import PageContent from '../../_layout/pageContent/pageContent';
import './proveedoresForm.css';

const { Title } = Typography;
const { Item } = Form;
const { TextArea } = Input;

function ProveedoresForm(props) {
    const { id } = useParams();
    let navigate = useNavigate();
    const [form] = Form.useForm();

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`https://localhost:44306/api/proveedores/${id}`, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    data.estado = data.estado === 'Activo' ? true : false;
                    form.setFieldsValue(data);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const onFinish = (values) => {
        setLoading(true);

        let link, method;

        if (id) {
            link = `https://localhost:44306/api/proveedores/${id}`;
            method = 'PUT';
            values.id = parseInt(id);
        } else {
            link = 'https://localhost:44306/api/proveedores';
            method = 'POST';
        }

        values.estado = values.estado ? 'Activo' : 'Inactivo';
        const config = { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) }

        fetch(link, config)
            .then(response => {
                if (response.ok) {
                    message.success('Proveedor guardada');
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
        <PageContent title="Proveedores" subtitle="Formulario">
            <Row>
                <Col span={8}>
                    <Title level={5} style={{ marginBottom: '24px' }}>{id ? 'Editar proveedor' : 'Agregar proveedor'}</Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={{
                            estado: true
                        }}
                    >
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

                        <Item label="Contacto" name="contacto">
                            <Input disabled={loading} allowClear />
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

export default ProveedoresForm;