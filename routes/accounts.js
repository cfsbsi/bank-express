import AccountsController from '../controllers/accounts';

export default (app) => {
  const accountsController = new AccountsController(app.datasource.models.Accounts);

  app.route('/accounts')
    .post((req, res) => {
      accountsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/accounts/:id')
    .get((req, res) => {
      accountsController.get(req.params.id)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/transfer')
    .post((req, res) => {
      accountsController.transfer(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

    app.route('/accounts/:id')
        .get((req, res) => {
            accountsController.get(req.params.id)
                .then((response) => {
                    res.status(response.statusCode);
                    res.json(response.data);
                });
        });
};
