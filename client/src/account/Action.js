import {LOAD_ACCOUNTS_SUCCESS} from '../utils/ActionTypes'
import {fetchAccounts} from '../utils/Api'

export function loadAccounts() {
    return function (dispatch) {
        fetchAccounts().then(accounts => {
            dispatch(loadAccountsSuccess({accounts}))
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadAccountsSuccess(state) {
    return {type: LOAD_ACCOUNTS_SUCCESS, state};
}
