import React from 'react';
import { Table, Card, Row, Col } from 'antd';

const ComparisonTable = ({ providers, consumption, selectedProvider }) => {
    const columns = [
        {
            title: 'Provider',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Rate (per kWh)',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Monthly Cost',
            dataIndex: 'cost',
            key: 'cost',
        },
    ];

    const data = providers.map((provider) => {
        const monthlyCost = consumption.reduce((acc, curr) => {
            return acc + (curr.value * provider.rate);
        }, 0);

        return {
            key: provider.id,
            name: provider.name,
            rate: provider.rate,
            cost: monthlyCost,
        };
    });

    return (
        <Card>
            <Row>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered
                        size="middle"
                        style={{ marginTop: 20 }}
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default ComparisonTable;
