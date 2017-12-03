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

    get(id) {
        return this.Accounts.findOne({where: {id}})
            .then(result => {
                if (result === null) {
                    throw {message: 'Account does not exist'};
                }
                return defaultResponse(result);
            })
            .catch(error => errorResponse(error.message));
    }

    transfer(data) {
        let source_account;
        let destination_account;

        return this.Accounts.findOne({where: {id: data.source_account_id}})
            .then(result => {
                if (result === null) {
                    throw {message: 'invalid source account'};
                }
                if (data.amount > result.balance) {
                    throw {message: 'Not enough money on the source account'};
                }
                source_account = result;
                return this.Accounts.findOne({where: {id: data.destination_account_id}});
            }).then(result => {
                if (result === null) {
                    throw {message: 'invalid destination account'}
                }
                destination_account = result;
                source_account.balance = source_account.balance - data.amount;
                return this.Accounts.update({balance: source_account.balance}, {where: {id: source_account.id}});
            }).then(() => {
                destination_account.balance = destination_account.balance + data.amount;
                return this.Accounts.update({balance: destination_account.balance}, {where: {id: destination_account.id}});
            }).then(() => {
                return {statusCode: HttpStatus.OK};
            })
            .catch(error => {
                return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
            });
    }
}

export default AccountsController;
