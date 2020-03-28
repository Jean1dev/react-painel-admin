import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Chat from '../components/Chat'
import MessageChart from '../components/MessageChart'
import TotalMessages from '../components/TotalMessage'
import Copyright from '../components/Copyright'
import Maps from '../components/Maps'
import Despesas from '../components/card-despesas'
import TotalUsers from '../components/card-total-users'
import TotalTask from '../components/card-tasks-progress'
import InfoMoney from '../components/card-info-money'
import UsersByDevice from '../components/card-users-by-device'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}))

export default function Dashboard() {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    return (
        <>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>

                    <Grid item xs={12} md={3} lg={3} sm={6} xl={3}>
                        <Despesas />
                    </Grid>

                    <Grid item xs={12} md={3} lg={3} sm={6} xl={3}>
                        <TotalUsers />
                    </Grid>

                    <Grid item xs={12} md={3} lg={3} sm={6} xl={3}>
                        <TotalTask />
                    </Grid>

                    <Grid item xs={12} md={3} lg={3} sm={6} xl={3}>
                        <InfoMoney />
                    </Grid>

                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <MessageChart />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <TotalMessages />
                        </Paper>
                    </Grid>

                    <Grid item 
                        lg={8}
                        md={6}
                        xl={6}
                        xs={12}>
                        <Paper className={classes.paper}>
                            <Maps />
                        </Paper>
                    </Grid>

                    <Grid item 
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}>
                        <UsersByDevice />
                    </Grid>

                </Grid>
                <Box pt={4}>
                    <Copyright />
                </Box>
            </Container>
            <Chat fullscreen={false}></Chat>
        </>
    )
}

