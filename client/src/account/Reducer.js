import {LOAD_ACCOUNTS_SUCCESS, CREATE_ACCOUNTS_SUCCESS, TRANSFER_ACCOUNTS_SUCCESS} from '../utils/ActionTypes'

function accounts(state = {accounts: [], updateNow: false}, action) {
    switch (action.type) {
        case LOAD_ACCOUNTS_SUCCESS:
            return {
                accounts: action.state.accounts,
                updateNow: false
            };
        case CREATE_ACCOUNTS_SUCCESS:
            return {
                comments: state.accounts.concat(action.state)
            }
        case TRANSFER_ACCOUNTS_SUCCESS:
            return {...state, updateNow: true};

        default :
            return state
    }
}

export default accounts;