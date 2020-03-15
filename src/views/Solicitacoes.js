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
import Badge from 'react-bootstrap/Badge'
import PeopleIcon from '@material-ui/icons/People'
import VisibilityIcon from '@material-ui/icons/Visibility'
import UserDetailModal from '../modal/user_details'
import SolicitacaoDetailModal from '../modal/solicitacao_details'
import Pagination from '../components/Pagination'
import Spinner from '../components/loader'
import api from '../service/api'
import moment from 'moment'
import getClass from '../utils/get-class-situacao-solicitacao'

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
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState([])
    const [showModalUser, setShowModalUser] = useState(false)
    const [showModalEditSolicitacao, setshowModalEditSolicitacao] = useState(false)
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState({})
    const [refresh, setRefresh] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)
    const [filter, setFilter] = useState({
        limit: rowsPerPage
    })

    useEffect(() => {
        async function getData() {
            const params = { params: filter }
            const result = await api.get('/register/solicitacao', params)
            if (result.data) {
                const x = result.data.map(createData)
                setLoading(false)
                setRows(x)
            }
        }

        getData()
    }, [refresh, filter])

    function editSolicitacao(solicitacao) {
        setSolicitacaoSelecionada(solicitacao)
        setshowModalEditSolicitacao(true)
    }

    function closeEditSolicitacao() {
        setshowModalEditSolicitacao(false)
        refreshScreen()
    }

    function showUserDetailModal() {
        setShowModalUser(true)
    }

    function closeUserDetailModal() {
        setShowModalUser(false)
    }

    function refreshScreen() {
        setRefresh(!refresh)
    }

    function onPageChanged(pageItem) {
        setCurrentPage(pageItem)
        setFilter({
            limit: rowsPerPage,
            skip: (pageItem * rowsPerPage) - 10
        })
    }

    if (loading) return <Spinner/>

    if (showModalUser) return <UserDetailModal show close={closeUserDetailModal} />

    if (showModalEditSolicitacao) {
        return <SolicitacaoDetailModal
            solicitacao={solicitacaoSelecionada}
            show
            close={closeEditSolicitacao} />
    }

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
                                    <TableCell>Descricao</TableCell>
                                    <TableCell align="right">Acoes</TableCell>
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
                                        <TableCell>
                                            <Badge variant={row.classBadge}>{row.situacao}</Badge>
                                        </TableCell>
                                        <TableCell>{row.descricao}</TableCell>
                                    
                                        <TableCell align="right">
                                            <VisibilityIcon onClick={() => {
                                                editSolicitacao(row)
                                            }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className={classes.seeMore}>
                            <Link color="primary" href="#" onClick={refreshScreen}>
                                Ver mais solicitacoes
                            </Link>
                        </div>
                    </Paper>

                    <Pagination
                        onPageChange={onPageChanged}
                        pageActive={currentPage}
                        rowsPerPage={rowsPerPage}
                        totalRows={rows.length}></Pagination>
                </Grid>
            </Container>
        </>
    )
}