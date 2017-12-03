import {LOAD_ACCOUNTS_SUCCESS} from '../utils/ActionTypes'

function accounts(state = {accounts: []}, action) {
    switch (action.type) {
        case LOAD_ACCOUNTS_SUCCESS:
            return {
                accounts: action.state.accounts
            };
        default :
            return state
    }
}

export default accounts;