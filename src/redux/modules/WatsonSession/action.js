import axios from '../../../service/api'
import error from '../../../utils/toast-error'
import { watsonTalks } from '../Watson/action'
import { store } from '../../index'

const watsonSession = sessionId => {
    return {
        type: 'WATSON_SESSION',
        watsonContext: sessionId
    }
}

export const watsonInit = () => {
    return dispatch => {
        axios.get('/assistant/session')
            .then(res => {
                const { session } = res.data
                const id = store.getState().auth.id
                dispatch(watsonSession(res.data))
                dispatch(watsonTalks(`Identificador unico:${id}`, session, { ignore: true }))
            })
            .catch(() => error('Erro ao iniciar sessao com o Watson'))
    }
}