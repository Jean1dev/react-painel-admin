import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import MoneyIcon from '@material-ui/icons/Money'
import Spinner from '../loader'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: '#800000',
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}))

const Budget = props => {
  const [loading, setLoading] = React.useState(true)
  const { className, ...rest } = props;

  const classes = useStyles();
  setTimeout(() => setLoading(false), 3000)

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        {loading && <Spinner />}
        {!loading &&
          <>
            <Grid
              container
              justify="space-between"
            >
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  CARTEIRA
           </Typography>
                <Typography variant="h3">$24,000</Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <MoneyIcon className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>
            <div className={classes.difference}>
              <ArrowDownwardIcon className={classes.differenceIcon} />
              <Typography
                className={classes.differenceValue}
                variant="body2"
              >
                12%
         </Typography>
              <Typography
                className={classes.caption}
                variant="caption"
              >
                no ultimo mes
         </Typography>
            </div>
          </>
        }
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
