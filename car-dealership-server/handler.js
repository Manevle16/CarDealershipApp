let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let port = process.env.PORT || 3000;

let profileRouter = require('./routes/ProfileRoutes');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));

// unifies the get and post requests. Post request has body as parameter, it is converted to query same as get request.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(Object.keys(req.query).length === 0 && req.query.constructor === Object) {
        req.query = req.body;
    }
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));
app.use("/profiles", profileRouter());

app.listen(port, function(){
    console.log("Running  on port " + port);
});