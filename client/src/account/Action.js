import {LOAD_ACCOUNTS_SUCCESS, CREATE_ACCOUNTS_SUCCESS} from '../utils/ActionTypes'
import {fetchAccounts, newAccount} from '../utils/Api'

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

export function createAccount(body) {
    return function (dispatch) {
        newAccount(body).then(comment => {
            dispatch(createAccountSuccess(comment))
        }).catch(error => {
            throw(error);
        });
    }
}

export function createAccountSuccess(state) {
    return {type: CREATE_ACCOUNTS_SUCCESS, state};
}