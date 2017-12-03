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
    return this.Accounts.findOne({ where: { id } })
      .then((result) => {
        if (result === null) {
          throw new Error('Account does not exist');
        }
        return defaultResponse(result);
      })
      .catch(error => errorResponse(error.message));
  }

  transfer(data) {
    let sourceAccount;
    let destinationAccount;

    return this.Accounts.findOne({ where: { id: data.source_account_id } })
      .then((result) => {
        if (result === null) {
          throw new Error('invalid source account');
        }
        if (data.amount > result.balance) {
          throw new Error('Not enough money on the source account');
        }
        sourceAccount = result;
        return this.Accounts.findOne({ where: { id: data.destination_account_id } });
      }).then((result) => {
        if (result === null) {
          throw new Error('invalid destination account');
        }
        destinationAccount = result;
        sourceAccount.balance -= data.amount;
        return this.Accounts
          .update({ balance: sourceAccount.balance }, { where: { id: sourceAccount.id } });
      }).then(() => {
        destinationAccount.balance += data.amount;
        return this.Accounts
          .update(
            { balance: destinationAccount.balance },
            { where: { id: destinationAccount.id } },
          );
      })
      .then(() => ({ statusCode: HttpStatus.OK }))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default AccountsController;
