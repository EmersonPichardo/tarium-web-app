import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from "react-router-dom";
import { Row, Typography, Col, Form, Input, Radio, Switch, Space, Divider, Button, message } from 'antd';
import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons';
import PageContent from '../../_layout/pageContent/pageContent';
import './sucursalesForm.css';

const { Title } = Typography;
const { Item } = Form;

function SucursalesForm(props) {
    const { id } = useParams();
    let navigate = useNavigate();
    const [form] = Form.useForm();

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`https://localhost:44306/api/sucursales/${id}`, { method: 'GET' })
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
            link = `https://localhost:44306/api/sucursales/${id}`;
            method = 'PUT';
            values.id = parseInt(id);
        } else {
            link = 'https://localhost:44306/api/sucursales';
            method = 'POST';
        }
        
        values.estado = values.estado ? 'Activo' : 'Inactivo';
        const config = { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) }

        fetch(link, config)
            .then(response => {
                if (response.ok) {
                    message.success('Sucursal guardada');
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
        <PageContent title="Sucursales" subtitle="Formulario">
            <Row>
                <Col span={8}>
                    <Title level={5} style={{ marginBottom: '24px' }}>{id ? 'Editar sucursal' : 'Agregar sucursal'}</Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={{
                            tipo: 'Tienda',
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

                        <Item label="Tipo de sucursal" name="tipo">
                            <Radio.Group buttonStyle="solid" disabled={loading}>
                                <Radio.Button value="Tienda">Tienda</Radio.Button>
                                <Radio.Button value="Almacén">Almacén</Radio.Button>
                            </Radio.Group>
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

export default SucursalesForm;