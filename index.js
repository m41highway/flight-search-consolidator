const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const fetch = require('node-fetch');

const mistifly = require('./flights/search-mystifly');
const travelfusion = require('./flights/search-travelfusion')


const app = new Koa();
const router = new Router();

app.use(bodyParser());

// app.use(logger());

app.use(router.routes());

app.listen(8200);

router.get('/', async function (ctx){
    ctx.body = 'Hello from Flight Seach Consolidator';
});


// ----------------------------------------------------
// Search Flight API
// Usage:
// POST http://localhost:8200/flights/search
// {
// 	  "origin": "DEL",
// 	  "destination": "SIN",
// 	  "departDate": "2017-08-15",
// 	  "returnDate": "2017-08-19"
// }
// to-do:
// 1. Passenge Type, qty
// 2. cabin perfer
// 3. max stop
// ----------------------------------------------------
router.post('/flights/search', async function (ctx){

    const departDate = ctx.request.body.departDate;
    const returnDate = ctx.request.body.returnDate;
    const origin = ctx.request.body.origin;
    const destination = ctx.request.body.destination;
    const cabinType = ctx.request.body.cabinType;

    let result = await Promise.all([
        mistifly.search(departDate, returnDate, origin, destination, cabinType),
        travelfusion.search(departDate, returnDate, origin, destination)
    ])

    ctx.body = result;
});

