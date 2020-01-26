import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from '../Title/Title'
import Spinner from 'react-bootstrap/Spinner'
import axios from '../../service/api'

function preventDefault(event) {
    event.preventDefault()
}

async function getData(callback) {
    const result = await axios.get('/register/message/count')
    callback(result.data)
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
})

export default function TotalMessage() {
    const classes = useStyles()
    const [loading, setLoading] = React.useState(true)
    const [value, setValue] = React.useState(null)
    getData(res => {
        setLoading(false)
        setValue(res.value)
    })

    return (
        <React.Fragment>
            <Title>Total mensagens</Title>
            {loading && <Spinner animation="border" role="status" variant="primary">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            {!loading && <Typography component="p" variant="h4">
                {value}
            </Typography>}
            <Typography color="textSecondary" className={classes.depositContext}>
                ate hoje
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    ver datelhes
                </Link>
            </div>
        </React.Fragment>
    )
}