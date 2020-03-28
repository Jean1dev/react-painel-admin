import React from 'react'
import { useDispatch } from 'react-redux'
import history from '../../service/history'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ListSubheader from '@material-ui/core/ListSubheader'
// import PeopleIcon from '@material-ui/icons/People';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { _signOut } from '../../redux/modules/Authenticate/action'

export const mainListItems = (
  <div>
    <ListItem button onClick={() => history.push('/')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Painel" />
    </ListItem>

    <ListItem button onClick={() => history.push('/solicitacao')}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Solicitacoes" />
    </ListItem>
  </div>
);

export default function SecondaryListItems() {
  const dispatch = useDispatch()

  function logout() {
    dispatch(_signOut())
  }
  
  return (
    <div>
      <ListSubheader inset>Outros</ListSubheader>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </div>
  )
}