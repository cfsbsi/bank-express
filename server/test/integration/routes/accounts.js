import HttpStatus from 'http-status';

describe('Routes: Accounts', () => {
    const Accounts = app.datasource.models.Accounts;

    let createdAccount1;
    let createdAccount2;

    beforeEach(done => {
        Accounts
            .destroy({where: {}})
            .then(() => Accounts.create({
                balance: 100,
            }))
            .then((account) => {
                createdAccount1 = account
            })
            .then(() => Accounts.create({
                balance: 100,
            }))
            .then((account) => {
                createdAccount2 = account
                done();
            });
    });

    describe('GET /accounts/{id}', () => {
        it('should return a account by id', done => {
            request
                .get(`/accounts/${createdAccount1.id}`)
                .end((err, res) => {
                    expect(res.body.id).to.eql(createdAccount1.id);
                    expect(res.body.balance).to.eql(100);
                    expect(res.statusCode).to.eql(HttpStatus.OK);
                    done(err);
                });
        });
    });

    describe('GET /accounts', () => {
        it('should return all account', done => {
            Accounts
                .destroy({where: {}}).then(() => {

                request
                    .get('/accounts')
                    .end((err, res) => {
                        expect(res.body.error).to.eql('We don\'t have anny account');
                        done(err);
                    });
            });
        });

        it('should return we don\'t have anny account message', done => {


            request
                .get('/accounts')
                .end((err, res) => {
                    expect(res.body[0].id).to.eql(createdAccount1.id);
                    expect(res.body[0].balance).to.eql(createdAccount1.balance);
                    expect(res.body[1].id).to.eql(createdAccount2.id);
                    expect(res.body[1].balance).to.eql(createdAccount1.balance);
                    expect(res.statusCode).to.eql(HttpStatus.OK);
                    done(err);
                });
        });
    });

    describe('POST /transfer', () => {
        it('should transfer a amount', done => {

            const transferRequest = {
                source_account_id: createdAccount1.id,
                destination_account_id: createdAccount2.id,
                amount: 100
            }

            request
                .post('/transfer')
                .send(transferRequest)
                .end((err, res) => {
                    expect(res.statusCode).to.eql(HttpStatus.OK);
                })
                .then(() => {
                request
                    .get(`/accounts/${createdAccount1.id}`)
                    .end((err, res) => {
                        expect(res.body.id).to.eql(createdAccount1.id);
                        expect(res.body.balance).to.eql(createdAccount1.balance - transferRequest.amount);
                        expect(res.statusCode).to.eql(HttpStatus.OK);
                    });
                 })
                .then(() => {
                    request
                        .get(`/accounts/${createdAccount2.id}`)
                        .end((err, res) => {
                            expect(res.body.id).to.eql(createdAccount2.id);
                            expect(res.body.balance).to.eql(createdAccount2.balance + transferRequest.amount);
                            expect(res.statusCode).to.eql(HttpStatus.OK);
                            done(err);
                        });
                });

        });

        it('should return a Not enough money message', done => {
            const transferRequest = {
                source_account_id: createdAccount1.id,
                destination_account_id: createdAccount2.id,
                amount: 200
            }

            request
                .post('/transfer')
                .send(transferRequest)
                .end((err, res) => {
                    expect(res.statusCode).to.eql(HttpStatus.UNPROCESSABLE_ENTITY);
                    expect(res.body.error).to.eql('Not enough money on the source account');
                    done(err);
                });
        });

        it('should return a invalid source account message', done => {
            const transferRequest = {
                source_account_id: 3,
                destination_account_id: createdAccount2.id,
                amount: 200
            }

            request
                .post('/transfer')
                .send(transferRequest)
                .end((err, res) => {
                    expect(res.statusCode).to.eql(HttpStatus.UNPROCESSABLE_ENTITY);
                    expect(res.body.error).to.eql('invalid source account');
                    done(err);
                });
        });

        it('should return a invalid destination account message', done => {
            const transferRequest = {
                source_account_id: createdAccount1.id,
                destination_account_id: 3,
                amount: 100
            }

            request
                .post('/transfer')
                .send(transferRequest)
                .end((err, res) => {
                    expect(res.statusCode).to.eql(HttpStatus.UNPROCESSABLE_ENTITY);
                    expect(res.body.error).to.eql('invalid destination account');
                    done(err);
                });
        });
    });

});
