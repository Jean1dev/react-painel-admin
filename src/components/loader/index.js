import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Container } from './styles'

export default function Loader() {
    return (
        <Container>
            <Spinner animation="border"/>
        </Container>
    )
}
