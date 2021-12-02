import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Form, Input, Divider, Button, message } from 'antd';
import './login.css';

const { Title } = Typography;
const { Item } = Form;
const { Password } = Input;

function Login(props) {
    const { id } = useParams();
    let navigate = useNavigate();
    const [form] = Form.useForm();

    let [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.removeItem('usuario');
    }, []);

    const onFinish = (values) => {
        setLoading(true);

        const config = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) }

        fetch('https://localhost:44306/api/login', config)
            .then(response => {
                if (response.ok) {
                    response.json().then(usuario => {
                        localStorage.setItem('usuario', JSON.stringify(usuario));
                        navigate('/');
                    })
                } else {
                    response.json().then(error => {
                        if(error.status === 404) {
                            message.error('Crendenciales incorrectas');
                        } else{
                            message.error(`${error.status}: ${error.title}`);
                        }
                        
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
        <div className="login-container">
            <div className="login-form">
                <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>Inicio de sesión</Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Item label="Correo" name="correo"
                        rules={[
                            {
                                required: true,
                                message: 'Este campo es requerido'
                            }
                        ]}
                    >
                        <Input disabled={loading} />
                    </Item>

                    <Item label="Contraseña" name="clave"
                        rules={[
                            {
                                required: true,
                                message: 'Este campo es requerido'
                            }
                        ]}
                    >
                        <Password disabled={loading} />
                    </Item>

                    <Divider />

                    <Item style={{textAlign: 'center'}}>
                        <React.StrictMode>
                            <Button type="primary" size="large" htmlType="submit" loading={loading}>
                                Iniciar sesión
                            </Button>
                        </React.StrictMode>
                    </Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;