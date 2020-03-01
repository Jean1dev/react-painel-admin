import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import LocationIcon from '@material-ui/icons/Room'
import Paper from '@material-ui/core/Paper'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Title from '../../components/Title/Title'
import ToastError from '../../utils/toast-error'
import Spinner from 'react-bootstrap/Spinner'
import Badge from 'react-bootstrap/Badge'
import api from '../../service/api'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}))

export default function SolicitacaoDetails(props) {
    const classes = useStyles()
    const handleClose = () => props.close()
    const [observacao, setObservacao] = React.useState('')
    const [reprovarLoading, setReprovarLoading] = React.useState(false)
    const [aprovarLoading, setAprovarLoading] = React.useState(false)

    const { solicitacao: s } = props
    const { usuarioCompleto: u } = s
    const somenteVisualizacao = s.situacao === 'APROVADO' || s.situacao === 'REPROVADO'
    const titleSolicitacao = somenteVisualizacao ?
        'Solicitacao ja tramitada' :
        'Detalhes da solicitacao'

    async function reprovar() {
        if (!observacao) {
            ToastError('Para reprovar essa solicitacao é necessario preencher o motivo na observacao de analise')
            return
        }

        setReprovarLoading(true)
        await api.post('/register/solicitacao/reprovar', {
            _id: s.id,
            observacao: observacao
        })
        handleClose()
    }

    async function aprovar() {
        setAprovarLoading(true)
        await api.post('/register/solicitacao/aprovar', {
            _id: s.id,
            observacao: observacao
        })
        handleClose()
    }

    function handleChange(event) {
        setObservacao(event.target.value)
    }

    return (
        <>
            <Modal size="lg" show={props.show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detalhamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Paper className={classes.paper}>
                                    <Title>Detalhes do solicitante</Title>
                                    <Form.Row>
                                        <Form.Label>Nome: {s.name}</Form.Label>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Label>Contato: {u.fone}</Form.Label>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Label>Email: {u.email}</Form.Label>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Label>Localizacao: {s.endereco}</Form.Label>
                                        <LocationIcon onClick={() => {
                                            alert('aqui vai redirecionar para o endereco')
                                        }} />
                                    </Form.Row>
                                </Paper>
                            </Col>

                            <Col md={12}>
                                <Paper className={classes.paper}>
                                    <Title>{titleSolicitacao}</Title>
                                    <Form.Row>
                                        <Form.Label>Foi criado dia: {s.date}</Form.Label>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Label>Descricao: {s.descricao}</Form.Label>
                                    </Form.Row>

                                    <Form.Row>
                                        <Badge variant={s.classBadge}>{s.situacao}</Badge>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Label>Observacoes de analise: </Form.Label>

                                        {somenteVisualizacao && <Form.Label>{s.observacao}</Form.Label>}

                                        {!somenteVisualizacao && <Form.Control
                                            as="textarea"
                                            rows="3"
                                            onChange={handleChange}
                                            name="observacao"
                                            id="observacao"
                                        />}
                                    </Form.Row>
                                </Paper>
                            </Col>
                        </Row>
                    </Container>


                </Modal.Body>
                <Modal.Footer>
                    {somenteVisualizacao &&
                        <Button variant="info" onClick={handleClose}> Fechar </Button>
                    }

                    {!somenteVisualizacao && <Button variant="danger" onClick={reprovar}>
                        Reprovar
                        {reprovarLoading && <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />}
                    </Button>}

                    {!somenteVisualizacao && <Button variant="primary" onClick={aprovar}>
                        Aprovar
                        {aprovarLoading && <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />}
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}
