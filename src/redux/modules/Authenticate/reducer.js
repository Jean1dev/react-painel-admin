const INITIAL_STATE = {
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
                token: action.payload.token,
                signed: true,
                loading: false
            }

        case '@auth/SIGN_OUT':
            return {
                token: null,
                signed: false,
                loading: false
            }
    }

    return state
}