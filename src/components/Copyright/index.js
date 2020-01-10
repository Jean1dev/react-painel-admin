import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
// import { Container } from './styles';

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
          IF tecnologia e comunicacao
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
}

