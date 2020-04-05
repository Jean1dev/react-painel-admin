import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography
} from '@material-ui/core'
import Carousel from './components/carousel'
import { Facebook as FacebookIcon, Google as GoogleIcon } from '../../components/icons'
import { useDispatch, useSelector } from 'react-redux'
import useForm from '../../hooks/useForm'
import toastError from '../../utils/toast-error'
import { _signIn } from '../../redux/modules/Authenticate/action'
import * as Yup from 'yup'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0),
    background: '#00BFA6'
  },
  googleButton: {
    background: '#db4a39'
  }
}))

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um email valido').required('O email é obrigatorio'),
  password: Yup.string().min(6, 'senha de no minimo 6 caracteres').required('A senha é obrigatoria')
})

export default function Login() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [{ values }, handleChange, handleSubmit] = useForm()
  const loading = useSelector(state => state.auth.loading)

  async function submitForm() {
    try {
      await schema.validate(values, {
        abortEarly: false,
        stripUnknown: true
      })

      dispatch(_signIn(values))
    } catch (error) {
      const { errors } = error
      errors.forEach(e => toastError(e))
    }
  }

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Carousel></Carousel>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              {/* colocar a logo aqui */}
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSubmit(submitForm)}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Login
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  faca login atraves das redes sociais
                </Typography>
                <Grid
                  className={classes.socialButtons}
                  container
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={() => { }}
                      size="large"
                      variant="contained"
                    >
                      <FacebookIcon className={classes.socialIcon} />
                      Login com Facebook
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.googleButton}
                      onClick={() => { }}
                      size="large"
                      variant="contained">
                      <GoogleIcon className={classes.socialIcon} />
                      Login com Google
                    </Button>
                  </Grid>
                </Grid>
                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  ou login com seu email
                </Typography>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Email "
                  name="email"
                  onChange={handleChange}
                  type="email"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Senha"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}

                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {loading && <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true" />}
                  Login
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  ainda nao tem uma conta?{' '}
                  <Link href="/register" variant="body2">
                    {"Cadastre-se"}
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

