import express from 'express';
import * as bodyParser from 'body-parser';
import * as routes from './routes'

const app = express();
app.use(express.json())
routes.register(app)

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/user', (req,res) => {
    res.status(200).json(users)
})

app.get('/', (req, res) => res.send('Hello World!'));

export {app};
