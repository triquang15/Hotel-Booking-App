import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
    let today = new Date();
    return (
        <footer className='by-dark text-light py-3 footer mt-lg-5'>
            <Container>
                <Row>
                    <Col xs={12} md={12} className='text-center'>
                        <p className='mb-0'>All material herein &copy; {today.getFullYear()} Booking Hotel Pte. Ltd. and Booking Hotel Services Pte. Ltd. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
