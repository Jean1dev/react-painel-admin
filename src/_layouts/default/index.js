import React from 'react';
import Header from 'components/Header'
import { Container } from './styles';

export default function defaultLayout({ children }) {
    return (
        <Container>
            <Header></Header>
            { children }
        </Container>
    );
}
