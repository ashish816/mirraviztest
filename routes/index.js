
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//https://www.twilio.com/blog/2015/10/getting-started-with-socket-io-adding-real-time-events-to-your-node-js-express-app.html