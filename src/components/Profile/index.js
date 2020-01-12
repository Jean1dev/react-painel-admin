import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import { useSelector } from 'react-redux'

// import { Container } from './styles';

const useStyles = makeStyles(theme => ({
    img : {
        width: '32px',
        height: '32px',
        borderRadius: '50%'
    } 
}))

export default function Profile() {
    const classes = useStyles()
    const profile = {}

    return (
        <aside>
            {/* <Profile> */}
                <div>
                    <strong> {profile.name} </strong>
                    {/* <Link to="/profile"> Meu perfil</Link> */}
                </div>
                <img className={classes.img} src={profile.avatar || 'https://api.adorable.io/avatars/50/abott@adorable.pngCopy'} alt=""></img>
            {/* </Profile> */}
        </aside>
    )
}
