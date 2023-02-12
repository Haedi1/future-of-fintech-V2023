// import styles from "./Header.module.css";
// export function Header() {
//     return (
//         <header className={styles.header}>
//             <h1>⚡ My electricity usage history ⚡</h1>
//         </header>
//   );
// }

import React from 'react';
import { Row, Col, Typography } from 'antd';
import './Header.module.css';

export function Header () {
    return (
        <Row className="header-container">
            <Col span={24}>
                <Typography.Title level={2}>Power Provider Comparison</Typography.Title>
            </Col>
        </Row>
    );
}



