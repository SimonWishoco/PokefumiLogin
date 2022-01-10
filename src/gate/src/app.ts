import express from 'express'
import * as routes from './routes'

const app = express()
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.use(express.json())
routes.register(app)
export {app};
