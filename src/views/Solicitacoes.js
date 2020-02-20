import React, { useEffect, useState } from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from '../components/Title/Title'
import PeopleIcon from '@material-ui/icons/People'
import UserDetailModal from '../modal/user_details'
import Spinner from 'react-bootstrap/Spinner'
import api from '../service/api'
import moment from 'moment'

function createData(solicitacao) {
    return {
        id: solicitacao._id,
        date: moment(solicitacao.dataCriacao).format('DD/MM/YYYY'),
        name: solicitacao.usuario.name,
        situacao: solicitacao.situacao,
        descricao: solicitacao.solicitacao,
        endereco: solicitacao.endereco || solicitacao.usuario.address
    }
}

function preventDefault(event) {
    event.preventDefault()
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar
}))

export default function Solicitacoes() {
    const classes = useStyles()
    const [rows, setRows] = useState(null)
    const [showModalUser, setShowModalUser] = useState(false)

    useEffect(() => {
        async function getData() {
            const result = await api.get('/register/solicitacao')
            if (result.data) {
                const x = result.data.map(createData)
                setRows(x)
            }
        }

        getData()
    }, [])

    function showUserDetailModal() {
        setShowModalUser(true)
    }

    function closeUserDetailModal() {
        setShowModalUser(false)
    }

    if (!rows) return <Spinner animation="border" />

    if (showModalUser) return <UserDetailModal show close={closeUserDetailModal} />

    return (
        <>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Title>Solicitacoes recentes</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Data</TableCell>
                                    <TableCell>Solicitante</TableCell>
                                    <TableCell>Situacao</TableCell>
                                    <TableCell>Solicitacao</TableCell>
                                    <TableCell align="right">Endereco</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>
                                            <PeopleIcon onClick={showUserDetailModal} />
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.situacao}</TableCell>
                                        <TableCell>{row.descricao}</TableCell>
                                        <TableCell align="right">{row.endereco}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className={classes.seeMore}>
                            <Link color="primary" href="#" onClick={preventDefault}>
                                Ver mais solicitacoes
                            </Link>
                        </div>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}