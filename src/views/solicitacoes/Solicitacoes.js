import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Title from '../../components/Title/Title'
import Spinner from '../../components/loader'
import api from '../../service/api'
import moment from 'moment'
import getClass from '../../utils/get-class-situacao-solicitacao'
import UserTable from './components/tabela'
import Toolbar from './components/toolbar'

function createData(solicitacao) {
    return {
        id: solicitacao._id,
        date: moment(solicitacao.dataCriacao).format('DD/MM/YYYY'),
        name: solicitacao.usuario.name,
        situacao: solicitacao.situacao,
        classBadge: getClass(solicitacao.situacao),
        descricao: solicitacao.solicitacao,
        endereco: solicitacao.endereco || solicitacao.usuario.address,
        usuarioCompleto: solicitacao.usuario,
        observacao: solicitacao.observacao
    }
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
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState({
        limit: rowsPerPage
    })

    useEffect(() => {
        async function fetch(p) {
            const params = { params: p || filter }
            const result = await api.get('/register/solicitacao', params)
            if (result.data) {
                const x = result.data.map(createData)
                setLoading(false)
                setRows(x)
            }
        }

        fetch()
    }, [refresh, filter])

    function refreshScreen() {
        setRefresh(!refresh)
    }

    function handleRowsPerPageChange(event) {
        // setTimeout(() => {
        //     setRowsPerPage(event.target.value)
        //     console.log('NEW VALOR', rowsPerPage, ' OLD', event.target.value)
        // }, 3000)

        setRowsPerPage(event.target.value)
        console.log('NEW VALOR', rowsPerPage, ' OLD', event.target.value)
        //setFilter({ limit: rowsPerPage })
        // console.log(rowsPerPage, event.target.value)
    }

    function onPageChanged(event, page) {
        setPage(page)
        setFilter({
            limit: rowsPerPage,
            skip: (page * rowsPerPage)
        })
    }

    if (loading) return <Spinner />

    return (
        <>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Toolbar />
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Title>Solicitacoes recentes</Title>
                        <UserTable
                            users={rows}
                            onPageChanged={onPageChanged}
                            handleRowsPerPageChange={handleRowsPerPageChange}
                            refreshScreen={refreshScreen}
                            rowsPerPage={rowsPerPage}
                            page={page}
                        ></UserTable>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}