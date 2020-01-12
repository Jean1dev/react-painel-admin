import axios from '../../../service/api'
import error from '../../../utils/toast-error'

const watsonRequest = () => {
    return {
        type: 'WATSON_REQUEST',
        load: true,
        error: false
    }
}

const watsonRequestSuccess = response => {
    return {
        type: 'WATSON_REQUEST_SUCCESS',
        response: response,
        load: false,
        error: false
    }
}

const watsonRequestError = err => {
    return {
        type: 'WATSON_REQUEST_ERROR',
        load: false,
        error: true,
        details: err
    }
}
// data.data.output.text[0]
export const watsonTalks = (message, context) => {
    return dispatch => {
        dispatch(watsonRequest())
        axios
            .post('/assistant/message', { message: message, session_id: context })
            .then(res => dispatch(watsonRequestSuccess(res.data)))
            .catch(err => {
                error('Erro ao enviar mensagem')
                dispatch(watsonRequestError(err))
            })
    }
}