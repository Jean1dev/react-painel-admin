import axios from '../../../service/api'
import error from '../../../utils/toast-error'

const watsonSession = sessionId => {
    return {
        type: 'WATSON_SESSION',
        watsonContext: sessionId
    }
}

export const watsonInit = () => {
    return dispatch => {
        axios.get('/assistant/session')
            .then(res => dispatch(watsonSession(res.data.result.session_id)))
            .catch(() => error('Erro ao iniciar sessao com o Watson'))
    }
}