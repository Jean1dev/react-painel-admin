import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header'
import Chat from '../components/Chat'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header></Header>
            <Chat></Chat>
        </div>
    );
}
