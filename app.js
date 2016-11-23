
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var connection = false;
app.get('/', routes.index);
app.get('/users', user.list);
app.post('/sendRequest', function(req, res) {
    var sex = req.param("sex");
    var inrange = req.param("inrange");

    console.log(sex);
    if(connection){
        io.emit('chat message', { range : inrange, sex : sex});
        res.end("Success");
        res.send();

    }else{
        console.log('No client connected');
    }
});

io.on('connection', function(socket){
    connection = true;
});


// 
// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
