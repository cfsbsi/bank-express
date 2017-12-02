import BooksController from '../../../controllers/accounts';

describe('Create a account: create()', () => {
    it('should create a account', () => {
        const Accounts = {
            create: td.function(),
        };

        const requestBody = {
            name: 'Test Book',
        };

        const expectedResponse = [{
            id: 1,
            balance: 0,
            created_at: '2016-08-06T23:55:36.692Z',
            updated_at: '2016-08-06T23:55:36.692Z',
        }];

        td.when(Accounts.create(requestBody)).thenResolve(expectedResponse);

        const accountsController = new BooksController(Accounts);
        return accountsController.create(requestBody)
            .then(response => {
                expect(response.data).to.be.eql(expectedResponse);
                expect(response.statusCode).to.be.eql(201);
            });
    });
});

describe('Transfer money: transfer()', () => {
    it('should transfer a amount with success', () => {
        const Accounts = {
            getById: td.function(),
            update: td.function(),
        };

        const requestBody = {
            source_account_id: 1,
            destination_account_id: 2,
            amount: 100
        };

        td.when(Accounts.getById(1)).thenResolve({id: 1, balance: 200});
        td.when(Accounts.getById(2)).thenResolve({id: 2, balance: 200});
        td.when(Accounts.update()).thenResolve({statusCode: 200});

        const accountsController = new BooksController(Accounts);
        return accountsController.transfer(requestBody)
            .then(response => {
                expect(response.statusCode).to.be.eql(200);
            });
    });

    it('should return a invalid source account', () => {
        const Accounts = {
            getById: td.function(),
            update: td.function(),
        };

        const requestBody = {
            source_account_id: 1,
            destination_account_id: 2,
            amount: 100
        };

        td.when(Accounts.getById(1)).thenResolve(null);
        td.when(Accounts.getById(2)).thenResolve({id: 2, balance: 200});
        td.when(Accounts.update()).thenResolve({statusCode: 200});

        const accountsController = new BooksController(Accounts);
        return accountsController.transfer(requestBody)
            .then(response => {
                expect(response.statusCode).to.be.eql(422);
                expect(response.data.error).to.be.eql('invalid source account');
            });
    });

    it('should return a invalid destination account', () => {
        const Accounts = {
            getById: td.function(),
            update: td.function(),
        };

        const requestBody = {
            source_account_id: 1,
            destination_account_id: 2,
            amount: 100
        };

        td.when(Accounts.getById(1)).thenResolve({id: 1, balance: 200});
        td.when(Accounts.getById(2)).thenResolve(null);
        td.when(Accounts.update()).thenResolve({statusCode: 200});

        const accountsController = new BooksController(Accounts);
        return accountsController.transfer(requestBody)
            .then(response => {
                expect(response.statusCode).to.be.eql(422);
                expect(response.data.error).to.be.eql('invalid destination account');
            });
    });

    it('should get a message with not enough money on source account', () => {
        const Accounts = {
            getById: td.function(),
            update: td.function(),
        };

        const requestBody = {
            source_account_id: 1,
            destination_account_id: 2,
            amount: 200.01
        };

        td.when(Accounts.getById(1)).thenResolve({id: 1, balance: 200});
        td.when(Accounts.getById(2)).thenResolve({id: 2, balance: 200});
        td.when(Accounts.update()).thenResolve({statusCode: 200});

        const accountsController = new BooksController(Accounts);
        return accountsController.transfer(requestBody)
            .then(response => {
                expect(response.statusCode).to.be.eql(422);
                expect(response.data.error).to.be.eql('Not enough money on the source account');
            });
    });
});