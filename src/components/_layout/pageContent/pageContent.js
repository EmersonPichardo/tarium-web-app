import React from 'react';
import { useNavigate } from "react-router-dom";
import { PageHeader, Layout } from 'antd';
import './pageContent.css'

const { Content } = Layout;

function PageContent(props) {
    const { title, subtitle, extra } = props;
    const navigate = useNavigate();

    return (<>
        <PageHeader
            className="site-layout-pageheader"
            ghost={false}
            onBack={() => navigate(-1)}
            title={title}
            subTitle={subtitle}
            extra={extra}
        />

        <Content className="site-layout-background">{props.children}</Content>
    </>)
}

export default PageContent;