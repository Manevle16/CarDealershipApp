let express = require('express');
let bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var fs = require('fs');

let app = express();
let port = process.env.PORT || 3000;

let profileRouter = require('./routes/ProfileRoutes');
let employeeRouter = require('./routes/EmployeeRoutes');
let carRouter = require('./routes/CarRoutes');
let customerRouter = require('./routes/CustomerRoutes');

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

var options = {
    key: fs.readFileSync( __dirname + '/myCA.key'),
    cert: fs.readFileSync( __dirname + '/myCA.pem'),
    passphrase: "3Fbb2e4df8"
};



app.use("/profiles", profileRouter());
app.use("/employee", employeeRouter());
app.use("/car", carRouter());
app.use("/customer", customerRouter());

app.listen(port, function(){
    console.log("Running  on port " + port);
});
app.get('/', function(req, res){
    res.send('Hello World!');
});

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
