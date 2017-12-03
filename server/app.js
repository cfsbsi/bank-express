import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import datasource from './config/datasource'
import config from './config/config';
import accountsRouter from './routes/accounts'

const app = express();
app.use(cors())

app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);

app.use(bodyParser.json());

accountsRouter(app);

export default app;