import 'react-perfect-scrollbar/dist/css/styles.css'
import React, { useState } from 'react';
import clsx from 'clsx';
import Badge from 'react-bootstrap/Badge'
import PerfectScrollbar from 'react-perfect-scrollbar';
import VisibilityIcon from '@material-ui/icons/Visibility'
import { makeStyles } from '@material-ui/core/styles'
import UserDetailModal from '../../../modal/user_details'
import SolicitacaoDetailModal from '../../../modal/solicitacao_details'
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

function UserTable(props) {
    const {
        className,
        users,
        onPageChanged,
        handleRowsPerPageChange,
        refreshScreen,
        rowsPerPage,
        page,
        ...rest
    } = props;
    const classes = useStyles();

    const [showModalUser, setShowModalUser] = useState(false)
    const [showModalEditSolicitacao, setshowModalEditSolicitacao] = useState(false)
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState({})
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSelectAll = event => {
        const { users } = props;

        let selectedUsers;

        if (event.target.checked) {
            selectedUsers = users.map(user => user.id);
        } else {
            selectedUsers = [];
        }

        setSelectedUsers(selectedUsers);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelectedUsers = [];

        if (selectedIndex === -1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
        } else if (selectedIndex === 0) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedUsers = newSelectedUsers.concat(
                selectedUsers.slice(0, selectedIndex),
                selectedUsers.slice(selectedIndex + 1)
            );
        }

        setSelectedUsers(newSelectedUsers);
    };

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

    if (showModalUser) return <UserDetailModal show close={closeUserDetailModal} />

    if (showModalEditSolicitacao) {
        return <SolicitacaoDetailModal
            solicitacao={solicitacaoSelecionada}
            show
            close={closeEditSolicitacao} />
    }

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedUsers.length === users.length}
                                            color="primary"
                                            indeterminate={
                                                selectedUsers.length > 0 &&
                                                selectedUsers.length < users.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Descricao</TableCell>
                                    <TableCell>Situacao</TableCell>
                                    <TableCell>Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.slice(0, rowsPerPage).map(user => (
                                    <TableRow
                                        className={classes.tableRow}
                                        hover
                                        key={user.id}
                                        selected={selectedUsers.indexOf(user.id) !== -1}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedUsers.indexOf(user.id) !== -1}
                                                color="primary"
                                                onChange={event => handleSelectOne(event, user.id)}
                                                value="true"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className={classes.nameContainer}>
                                                <Avatar
                                                    onClick={showUserDetailModal}
                                                    className={classes.avatar}
                                                    src="https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg"
                                                >
                                                    {user.name}
                                                </Avatar>
                                                <Typography variant="body1">{user.name}</Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.descricao}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.classBadge}>{user.situacao}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {user.date}
                                        </TableCell>
                                        <TableCell align="right">
                                            <VisibilityIcon onClick={() => {
                                                editSolicitacao(user)
                                            }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>

                {/* <Pagination
                        onPageChange={onPageChanged}
                        pageActive={currentPage}
                        rowsPerPage={rowsPerPage}
                        totalRows={rows.length}></Pagination> */}

                <TablePagination
                    component="div"
                    count={users.length}
                    onChangePage={onPageChanged}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage="Registros por pagina"
                />
            </CardActions>
        </Card>
    );
};

export default UserTable;
