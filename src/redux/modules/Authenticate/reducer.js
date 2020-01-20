const INITIAL_STATE = {
    id: null,
    token: null,
    signed: false,
    loading: false
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@auth/SIGN_IN_REQUEST':
            return {
                loading: true
            }
        
        case '@auth/SIGN_FAILURE':
            return {
                loading: false
            }

        case '@auth/SIGN_IN_SUCCESS':
            return {
                id: action.payload.user._id,
                token: action.payload.token,
                signed: true,
                loading: false
            }

        case '@auth/SIGN_OUT':
            return {
                id: null,
                token: null,
                signed: false,
                loading: false
            }
        default: return state
    }
}