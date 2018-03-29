import HttpStatus from 'http-status';

describe('Routes: Statement', () => {
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

    describe('GET /statement/{id}', () => {
        it('should return a statement by id', done => {
            request
                .get(`/statement/${createdAccount1.id}`)
                .end((err, res) => {
                    expect(res.body.id).to.eql(createdAccount1.id);
                    expect(res.body.statement).to.eql([]);
                    expect(res.statusCode).to.eql(HttpStatus.OK);
                    done(err);
                });
        });
    });
});