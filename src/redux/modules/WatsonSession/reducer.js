const INITIAL_STATE = {
    watsonContext: null,
    date: null
}

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'WATSON_SESSION') return { watsonContext: action.watsonContext.session, date: new Date() }
    return state
}

