const main = require('./routes/main'),
      vacation = require('./routes/vacation'),
      tests = require('./routes/tests'),
      posts = require('./routes/posts'),
      other = require('./routes/other'),
      news = require('./routes/news'),
      user = require('./routes/user');

const customerOnly = (req,res,next)=>{
  if ( req.user && req.user.role === 'customer' ) return next();
  res.redirect(303, '/unauthorized');
;}
const employeeOnly = (req,res,next)=>{
  if ( req.user && req.user.role === 'employee' ) return next();
  next('route');
};

function routsHandler(app) {
  app.get('/', main.home);
  app.get('/about', main.about);
  app.get('/login', main.login);
  app.get('/vacation', vacation.vacation);
  app.get('/contest/vacation-photo', vacation.contest);
  app.post('/contest/vacation-photo/:year/:month', posts.contest);
  app.get('/tours/tours-rate', vacation.tourRate);
  app.get('/tours/kwai', vacation.kwai);
  app.get('/notify', vacation.notify);
  app.post('/notify', posts.notify);
  app.get('/test/:name/:age', tests.test);
  app.get('/test-funcs', tests.funcs);
  app.get('/fail', tests.fail);
  app.get('/epic-fail', tests.epicFail);
  app.post('/sending', posts.sending);
  app.post('/newseller', posts.newseller);
  app.post('/process', posts.process);
  app.get('/newseller', news.newseller);
  app.get('/news', news.news);
  app.get('/done', other.done);
  app.get('/error', other.error);
  app.get('/headers', tests.headers);
<<<<<<< HEAD
<<<<<<< HEAD
  app.post('/xhrtest', posts.xhrtest);
=======
=======
>>>>>>> ee8d9c0012c2d58075f99e4c00bc6b03e8920b44
  app.get('/unauthorized', user.unauthorized);
  app.get('/account', customerOnly, user.account);
  app.get('/account/order-history', customerOnly, user.account);
  app.get('/sales', employeeOnly, user.sales);
<<<<<<< HEAD
>>>>>>> ee8d9c0012c2d58075f99e4c00bc6b03e8920b44
=======
>>>>>>> ee8d9c0012c2d58075f99e4c00bc6b03e8920b44
}

module.exports = routsHandler;