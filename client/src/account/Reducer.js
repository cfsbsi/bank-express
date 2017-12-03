import {LOAD_ACCOUNTS_SUCCESS, CREATE_ACCOUNTS_SUCCESS} from '../utils/ActionTypes'

function accounts(state = {accounts: []}, action) {
    switch (action.type) {
        case LOAD_ACCOUNTS_SUCCESS:
            return {
                accounts: action.state.accounts
            };
        case CREATE_ACCOUNTS_SUCCESS:
            return {
                comments: state.accounts.concat(action.state)
            }
        default :
            return state
    }
}

export default accounts;