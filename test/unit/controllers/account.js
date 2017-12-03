import HttpStatus from 'http-status';
import AccountsController from '../../../controllers/accounts';

describe('Create a account: create()', () => {
    it('should create a account', () => {
        const Accounts = {
            create: td.function(),
        };

        const requestBody = {
            balance: 0,
        };

        const expectedResponse = [{
            id: 1,
            balance: 0,
            created_at: '2016-08-06T23:55:36.692Z',
            updated_at: '2016-08-06T23:55:36.692Z',
        }];

        td.when(Accounts.create(requestBody)).thenResolve(expectedResponse);

        const accountsController = new AccountsController(Accounts);
        return accountsController.create(requestBody)
            .then(response => {
                expect(response.data).to.be.eql(expectedResponse);
                expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
            });
    });
});

describe('Transfer money: transfer()', () => {
    it('should transfer a amount with success', () => {
        const Accounts = {
            findOne: td.function(),
            update: td.function(),
        };

        const requestBody = {
            source_account_id: 1,
            destination_account_id: 2,
            amount: 100
        };

        td.when(Accounts.findOne({where: {id: 1}})).thenResolve({id: 1, balance: 200});
        td.when(Accounts.findOne({where: {id: 2}})).thenResolve({id: 2, balance: 200});
        td.when(Accounts.update()).thenResolve({statusCode: HttpStatus.OK});

        const accountsController = new AccountsController(Accounts);
        return accountsController.transfer(requestBody)
            .then(response => {
                expect(response.statusCode).to.be.eql(HttpStatus.OK);
            });
    });

    it('should return a invalid source account', () => {
        const Accounts = {
            findOne: td.function(),
            update: td.function(),
        };

        const requestBody = {
            source_account_id: 1,
            destination_account_id: 2,
            amount: 100
        };

        td.when(Accounts.findOne({where: {id: 1}})).thenResolve(null);
        td.when(Accounts.findOne({where: {id: 2}})).thenResolve({id: 2, balance: 200});
        td.when(Accounts.update()).thenResolve({statusCode: HttpStatus.OK});

        const accountsController = new AccountsController(Accounts);
        return accountsController.transfer(requestBody)
            .then(response => {
                expect(response.statusCode).to.be.eql(HttpStatus.UNPROCESSABLE_ENTITY);
                expect(response.data.error).to.be.eql('invalid source account');
            });
    });

    it('should return a invalid destination account', () => {
        const Accounts = {
            findOne: td.function(),
            update: td.function(),
        };

        const requestBody = {
            source_account_id: 1,
            destination_account_id: 2,
            amount: 100
        };

        td.when(Accounts.findOne({where: {id: 1}})).thenResolve({id: 1, balance: 200});
        td.when(Accounts.findOne({where: {id: 2}})).thenResolve(null);
        td.when(Accounts.update()).thenResolve({statusCode: HttpStatus.OK});

        const accountsController = new AccountsController(Accounts);
        return accountsController.transfer(requestBody)
            .then(response => {
                expect(response.statusCode).to.be.eql(HttpStatus.UNPROCESSABLE_ENTITY);
                expect(response.data.error).to.be.eql('invalid destination account');
            });
    });

    it('should get a message with not enough money on source account', () => {
        const Accounts = {
            findOne: td.function(),
            update: td.function(),
        };

        const requestBody = {
            source_account_id: 1,
            destination_account_id: 2,
            amount: 200.01
        };

        td.when(Accounts.findOne({where: {id: 1}})).thenResolve({id: 1, balance: 200});
        td.when(Accounts.findOne({where: {id: 2}})).thenResolve({id: 2, balance: 200});
        td.when(Accounts.update()).thenResolve({statusCode: HttpStatus.OK});

        const accountsController = new AccountsController(Accounts);

        return accountsController.transfer(requestBody)
            .then(response => {
                expect(response.statusCode).to.be.eql(HttpStatus.UNPROCESSABLE_ENTITY);
                expect(response.data.error).to.be.eql('Not enough money on the source account');
            });
    });
});

describe('Get a account: get()', () => {
    it('should get a account by id', () => {
        const Accounts = {
            findOne: td.function(),
        };

        const expectedResponse = {
            id: 1,
            balance: 0,
            created_at: '2016-08-06T23:55:36.692Z',
            updated_at: '2016-08-06T23:55:36.692Z',
        };

        td.when(Accounts.findOne({where: {id: 1}})).thenResolve(expectedResponse);

        const accountsController = new AccountsController(Accounts);
        return accountsController.get(1)
            .then(response => {
                expect(response.data).to.be.eql(expectedResponse);
                expect(response.statusCode).to.be.eql(HttpStatus.OK);
            });
    });

    it('should get a message the account does not exists', () => {
        const Accounts = {
            findOne: td.function(),
        };

        td.when(Accounts.findOne({where: {id: 1}})).thenResolve(null);

        const accountsController = new AccountsController(Accounts);
        return accountsController.get(1)
            .then(response => {
                expect(response.data.error).to.be.eql('Account does not exist');
                expect(response.statusCode).to.be.eql(HttpStatus.BAD_REQUEST);
            });
    });
});