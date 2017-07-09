const express = require('express'),
      app = express(),
      pug = require('pug').create,
			scss = require('node-sass-middleware'), 
      path = require('path'),
			publicPath = path.join(__dirname, 'public'),
			fortune = require('./lib/fortune'),
			getWeatherData = require('./lib/getWeatherData'), //not use
			isProd = app.get('env') === 'production';

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(scss({
    src: publicPath,
    dest: publicPath,
    debug: true,
    outputStyle: 'compressed',
		sourceMap: true
}));

app.use(express.static(publicPath));


app.use((req,res,next)=>{
	res.locals.showTests = !isProd && req.query.test === '1';
	console.log(res.locals.showTests);
	next();
});

// app.use((req,res,next)=>{
// 	if( !res.locals.partials ) res.locals.partials = {};
// 	res.locals.partials.weather = getWeatherData();
// 	next();
// });

app.get('/', (req, res)=>{
	res.render('index', {
		title: 'Home'
	});
});

app.get('/about', (req, res)=>{
	res.render('about', { 
		title: 'About',
		fortune: fortune.getFortune(),
		pageTestScript: 'tests-about'
	});
});

app.get('/tours/tours-rate', (req, res)=>{
	res.render('tours/tours-rate', {
		title: 'tours rate'
	});
});

app.get('/tours/kwai', (req, res)=>{
	res.locals = {
		title: 'Test'
	}
	res.render('tours/kwai', {
		title: 'kwai'
	});
});
app.get('/headers', (req, res)=>{
	res.set('Content-Type', 'text/plain');
	var s = '';
	for( var method in req.headers){
		s += method + ': ' + req.headers[method] + '\n';
	}
	res.send(s);
});
app.get('/test-funcs', (req, res)=>{
	res.render('test-funcs', {
		title: 'test-funcs',
		pageTestScript: 'test-funcs',
		scriptForPage: 'test-funcs'
	});
});

app.use((req, res)=>{
	res.status(400);
	res.render('404');
});

app.use((err, req, res, next)=>{
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), ()=>console.log(`Express is runing on localhost:${app.get('port')} press ctrl+c for closing up`));

