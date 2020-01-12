import axios from '../../../service/api'
import error from '../../../utils/toast-error'

function signInRequest(email, password) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: {
            email, password
        }
    }
}

function signInSuccess(token, user) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: { token, user }
    }
}

function signUpRequest(name, email) {
    return {
        type: '@auth/SIGN_UP_REQUEST',
        payload: { name, email }
    }
}

function signFailure() {
    return {
        type: '@auth/SIGN_FAILURE'
    }
}

// function signOut() {
//     return {
//         type: '@auth/SIGN_OUT'
//     }
// }

export function _signIn(credentials) {
    return dispatch => {
        const { name, email } = credentials
        dispatch(signInRequest(name, email))
        axios.post('/register/user/login', credentials)
            .then(data => {
                const { token, user } = data.data
                dispatch(signInSuccess(token, user))
                axios.defaults.headers['Authorization'] = `Bearer ${token}`
            })
            .catch(() => {
                dispatch(signFailure())
                error('Erro ao efetuar login')
            })
    }
}

export function _signUp(credentials) {
    return dispatch => {
        const { name, email } = credentials
        dispatch(signUpRequest(name, email))
        axios.post('/register/user', credentials)
            .then(data => {
                const { token, user } = data.data
                dispatch(signInSuccess(token, user))
                axios.defaults.headers['Authorization'] = `Bearer ${token}`
            })
            .catch(() => {
                dispatch(signFailure())
                error('Erro ao efetuar cadastro')
            })
    }
}