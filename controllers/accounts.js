import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
    error: message,
}, statusCode);

class AccountsController {
    constructor(Accounts) {
        this.Accounts = Accounts;
    }

    create(data) {
        return this.Accounts.create(data)
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    transfer(data) {
        let source_account;
        let destination_account;

        return this.Accounts.getById(data.source_account_id)
            .then(result => {
                if (result === null) {
                    throw 'invalid source account'
                }
                if (data.amount > result.balance) {
                    throw 'Not enough money on the source account';
                }
                source_account = result;
                return this.Accounts.getById(data.destination_account_id);
            }).then(result => {
                if (result === null) {
                    throw 'invalid destination account'
                }
                destination_account = result;
                const balance = source_account.balance - data.amount;
                return this.Accounts.update(...source_account, balance);
            }).then(() => {
                const balance = destination_account.balance + data.amount;
                return this.Accounts.update(...destination_account, balance);
            }).then(() => {
                return {statusCode: HttpStatus.OK};
            })
            .catch(error => {
                return errorResponse(error, HttpStatus.UNPROCESSABLE_ENTITY)
            });
    }
}

export default AccountsController;
