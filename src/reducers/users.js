const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {

        case "LOGIN":
            return action.payload.therapist.users
        
        case "LOGIN_WITH_TOKEN":
            return action.payload.users
        
        default: return state
    }
}