const initialState = {
    token: '',
    id: 0,
    name: '',
    email: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case "LOGIN":
            return {
                token: action.payload.token,
                id: action.payload.therapist.id,
                name: action.payload.therapist.name,
                email: action.payload.therapist.email
            }
        
        case "LOGIN_WITH_TOKEN":
            return {
                token: localStorage.tokenId.slice(0, 88),
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email
            }
        
        case "LOGOUT":
            return initialState
        
        default: return state
    }
}